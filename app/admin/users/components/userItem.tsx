import { UserInterface } from "@/app/api/admin/users/route";
import React from "react";

const UserItem = ({
  user: { email, firstName, id, lastName, profileImageUrl, role },
  getUsersList,
}: {
  user: UserInterface;
  getUsersList: () => void;
}) => {
  const adminToggle = async () => {
    try {
      const res = await fetch(`/api/admin/adminToggle/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.status) {
        getUsersList();
        alert(data.msg)
      }else{
        alert(data.error)
      }
    } catch (err) {
      console.log(err);
    }

  };
  return (
    <tr>
      <td className="p-2 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
            <img
              className="rounded-full"
              src={profileImageUrl}
              width="40"
              height="40"
              alt="Alex Shatov"
            />
          </div>
          <div className="font-medium text-gray-800">
            {firstName} {lastName}
          </div>
        </div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left">{email}</div>
      </td>

      <td className="p-2 whitespace-nowrap">
        <div className="text-lg text-center">
          <button
            onClick={adminToggle}
            className="btn border px-3 py-1 text-[0.7em] hover:bg-slate-500 hover:text-white"
          >
            {role}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserItem;
