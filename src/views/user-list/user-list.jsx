import React, { useEffect, useState, useRef } from "react";
import { UserItem } from "../../components/user-item/user-item";
import { UserFilter } from "../../components/user-filter/user-filter";
import './user-list.css';

export const UserList = () => {
  const [page, setPage] = useState(1);
  const [gender, setGender] = useState("");
  const [users, setUsers] = useState([]);

  const loadingRef = useRef(null);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1);
    }
  };

  const deleteItem = (user) => {
    setUsers(users.filter((u) => u !== user));
  };

  const filterBy = (filterCriteria) => {
    setGender(filterCriteria);
    let usersList = users.filter((u) => u.gender === filterCriteria);
    setUsers(usersList);
  };

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "1px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }
  }, []);

  useEffect(() => {
    let url = `https://randomuser.me/api/?page=${page}${
      gender ? "&gender=" + gender : ""
    }&results=20`;
    fetch(url)
      .then(async (data) => await data.json())
      .then((data) => {
        setUsers([...users, ...data.results]);
      })
      .catch((_) => console.log("something went wrong getting data"));
  }, [page]);

  return (
    <div className="page-container">
      <UserFilter onFilter={filterBy}></UserFilter>
      <div className="item-container">
        {users.map((user, index) => {
          return (
            <UserItem user={user} key={index} onDelete={deleteItem}></UserItem>
          );
        })}
      </div>
      <div ref={loadingRef}>
        <span>Loading...</span>
      </div>
    </div>
  );
};
