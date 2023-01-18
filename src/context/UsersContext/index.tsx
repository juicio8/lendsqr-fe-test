import {
  useContext,
  useEffect,
  useState,
  createContext,
  MouseEventHandler,
} from "react";
import { convertDate } from "../../components/Users/utilities";
import { status } from "./../../components/Users/utilities";

type UsersTypes = {
  users: any;
  filteredUsers: any;
  setFilteredUsers: (data: any) => void;
  active: MouseEventHandler<HTMLDivElement | undefined>;
  blacklist: MouseEventHandler<HTMLDivElement | undefined>;
};
const initialState: UsersTypes = {
  users: [],
  filteredUsers: [],
  setFilteredUsers: () => {},
  active: (id: any) => {},
  blacklist: () => {},
};

type UsersContextProviderProps = {
  children: React.ReactNode;
};
export const UsersContext = createContext<UsersTypes>(initialState);

export const UsersContextProvider = ({
  children,
}: UsersContextProviderProps) => {
  const [users, setUsers] = useState<any>([]);

  const [filteredUsers, setFilteredUsers] = useState([]);

  console.log(filteredUsers);
  console.log(users);

  //changing date format
  const changingDateFormat = (users: any) => {
    const newUsers = users?.map((user: any) => {
      let newCreatedAt = convertDate(user.createdAt);
      return {
        ...user,
        createdAt: newCreatedAt,
      };
    });
    const newUsersWithStatus = setStatus(newUsers);
    setUsers(newUsersWithStatus);
    setFilteredUsers(newUsersWithStatus);
  };

  //setting a status
  const setStatus = (users: any) => {
    const userStatus = users.map((user: any) => {
      const returnedStatus = status(
        user.lastActiveDate.slice(0, 4),
        user.education.loanRepayment
      );
      console.log(returnedStatus);
      return {
        ...user,
        state: returnedStatus,
      };
    });
    console.log(userStatus);
    return userStatus;
  };

  useEffect(() => {
    fetch("https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users")
      .then((res) => res.json())
      .then((data) => {
        changingDateFormat(data);
        console.log(users);
      });
  }, []);

  //handlesFilter
  const handleFiltering = (data: any) => {
    setFilteredUsers(data);
  };
  //handles setting active
  const active = (id: any) => {
    const activeUsers = users.map((user: any) => {
      if (user.id === id) {
        return {
          ...user,
          state: {
            status: "Active",
          },
        };
      }
      return user;
    });
    setUsers(activeUsers);
    setFilteredUsers(activeUsers);
  };
  //handles setting blackist user
  const blacklist = (id: any) => {
    const blacklistUsers = users.map((user: any) => {
      if (user.id === id) {
        return {
          ...user,
          state: {
            status: "Blacklisted",
          },
        };
      }
      return user;
    });
    setUsers(blacklistUsers);
    setFilteredUsers(blacklistUsers);
  };
  return (
    <UsersContext.Provider
      value={{ users, filteredUsers, setFilteredUsers, active, blacklist }}
    >
      {children}
    </UsersContext.Provider>
  );
};
