import React from "react";
import Modal from "../../components/Modal";
import FundWAlletModal from "../../components/Modals/FundWAlletModal";

const Account = () => {
  const Menus = [
    // { title: "Files ", src: "Folder", gap: true },
    { title: <Modal />, k: <Modal />, gap: true },
  ];

  return (
    <div className="flex w-full justify-center">
      {Menus.map((menu) => {
        return <a href={menu.gap}>{menu.title}</a>;
      })}
    </div>
  );
};

export default Account;
