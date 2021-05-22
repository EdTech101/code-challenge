import React, { useState } from "react";
import "./user-item.css";
import logo from "../../assets/img/profile-pic.png";
import {ContactInfoDialog} from '../contact-info-dialog/contact-info-dialog';

export const UserItem = ({ user, onDelete }) => {
  const deleteItem = (id) => !isOpen && onDelete(id);
  const [isOpen,openDialog] = useState(false)
  
  const connect = () =>{
    openDialog(true);
  }

  const onCloseDialog = ()=>{
    openDialog(false);
  }

  return (
    <div
      className="user-item"
      onClick={() => {
        deleteItem(user);
      }}
    >
      <button className="user-button-delete" onClick={() => deleteItem(user)}>
        ✖
      </button>
      <div className="header">
        <div className="thumbnail">
          <img src={user.picture.large || logo} alt="profile-pic" />
        </div>
      </div>
      <div className="content">
        <div>
          <h1 className="title">
            {user.name?.title} {user.name.first} {user.name.last}
          </h1>
          <span>{user.gender}</span>
        </div>
        <button
          className="user-button-connect"
          onClick={(event) => {
            event.stopPropagation();
            connect(user);
          }}
        >
          Connect
        </button>
      </div>
      {isOpen && (
        <ContactInfoDialog
          user={user}
          onClose={onCloseDialog}
        ></ContactInfoDialog>
      )}
    </div>
  );
};
