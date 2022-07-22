import React from "react";
import Modal from "../../components/Modal";
import FundWAlletModal from "../../components/Modals/FundWAlletModal";

const Account = () => {
  const Menus = [
    // { title: "Files ", src: "Folder", gap: true },
    { title: <Modal />, k: <Modal />, gap: true },
  ];

  return (
    <div className="flex h-screen w-full justify-center items-center">
      {Menus.map((menu) => {
        return (
          <a
            className="bg-green-300 px-4 py-2 rounded text-white  flex "
            href={menu.gap}
          >
            {menu.title}
          </a>
        );
      })}
    </div>
  );
};

export default Account;
