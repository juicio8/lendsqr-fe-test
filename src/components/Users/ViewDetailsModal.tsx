import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { UsersContext } from "./../../context/UsersContext/index";

const ViewDetailsModal = ({ id }: any) => {
  const { active, blacklist } = useContext(UsersContext);
  const navigate = useNavigate();
  const view = () => {
    localStorage.setItem("id", id);
    fetch(
      `https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("userDetail", JSON.stringify(data));
        navigate("/dashboard/users/general");
      });
  };

  return (
    <div className="view-details">
      <div className="link" onClick={view}>
        <img src="/assets/eye.svg" alt="" />
        <div>
          <div>View Details</div>
        </div>
      </div>
      <div className="link blacklist" onClick={() => blacklist(id)}>
        <img src="/assets/blacklist.svg" alt="" />
        <div>
          <div>Blacklist User</div>
        </div>
      </div>
      <div className="link" onClick={() => active(id)}>
        <img src="/assets/active.svg" alt="" />
        <div>
          <div>Activate User</div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
