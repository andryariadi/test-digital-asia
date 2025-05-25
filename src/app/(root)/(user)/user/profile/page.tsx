import ButtonBack from "@/components/ButtonBack";
import { getUser } from "@/lib/actions/auth.action";
import React from "react";

const ProfilePage = async () => {
  const user = await getUser();

  const firstLetter = user.username?.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen pt-3 flex items-center justify-center">
      <div className="space-y-5 w-full max-w-[400px] p-5 rounded-lg hover:shadow-lg trassation-all duration-300">
        {/* Top */}
        <div className="space-y-5">
          {/* Title */}
          <div className="flex flex-col items-center justify-center gap-8">
            <h1 className="text-xl font-bold text-center text-slate-900">User Profile</h1>

            <div className="bg-blue-200 size-[68px] rounded-full flex items-center justify-center">
              <span className="text-blue-900 text-[24px] font-semibold">{firstLetter}</span>
            </div>
          </div>

          {/* User info */}
          <div className="space-y-5">
            {/* Username */}
            <div className="flex items-center justify-between p-2 rounded-md bg-slate-200">
              {/* Key */}
              <div className="w-full max-w-28 flex items-center justify-between">
                <h3 className="text-[16px] font-semibold text-slate-900">Username</h3>
                <span>:</span>
              </div>

              {/* Value */}
              <div className="w-full max-w-40 flex items-center">
                <p className="text-slate-900 capitalize">{user.username}</p>
              </div>
            </div>

            {/* Password */}
            <div className="flex items-center justify-between p-2 rounded-md bg-slate-200">
              {/* Key */}
              <div className="w-full max-w-28 flex items-center justify-between">
                <h3 className="text-[16px] font-semibold text-slate-900">Password</h3>
                <span>:</span>
              </div>

              {/* Value */}
              <div className="w-full max-w-40 flex items-center">
                <p className="text-slate-900 capitalize">{user.id}</p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center justify-between p-2 rounded-md bg-slate-200">
              {/* Key */}
              <div className="w-full max-w-28 flex items-center justify-between">
                <h3 className="text-[16px] font-semibold text-slate-900">Role</h3>
                <span>:</span>
              </div>

              {/* Value */}
              <div className="w-full max-w-40 flex items-center">
                <p className="text-slate-900 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <ButtonBack />
      </div>
    </main>
  );
};

export default ProfilePage;
