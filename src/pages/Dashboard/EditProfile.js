import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.init";
import { useQuery } from "react-query";
import LoginLoding from "../../shared/LoginLoding";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "./SweetAlert.css";

import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const EditProfile = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [user, loading] = useAuthState(auth);

  // if (!loading || !setUpdateLoading) {
  //   return <LoginLoding></LoginLoding>;
  // }

  //   const { data: users, isLoading } = useQuery(["user"], () =>
  //     fetch(`https://dry-garden-16157.herokuapp.com/user/${user?.email}`)
  //       .then((res) => res.json())
  //       .then((updateData) => console.log(updateData))
  //   );

  //   if (isLoading) {
  //     return <LoginLoding></LoginLoding>;
  //   }
  const onSubmit = async (data) => {
    setUpdateLoading(true);

    console.log(data);

    // upload image to the imgbb site:
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=829d3a7b3715690cf21c75412d2e4082`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((uploadImg) => {
        if (uploadImg.success || uploadImg.status_txt === "Bad Request") {
          // after successfully uploading imgbb thn post to the database:
          const img = uploadImg.data?.url;
          const updatedUserInfo = {
            displayName: data?.name,
            img: img,
            address: data?.address,
            number: data?.number,
            institude: data?.institude,
          };
          console.log(updatedUserInfo);

          //   now post all user updated info to the database:
          // send to your database
          fetch(`https://dry-garden-16157.herokuapp.com/user/${user?.email}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(updatedUserInfo),
          })
            .then((res) => res.json())
            .then((updateUserData) => {
              if (updateUserData?.result) {
                Swal.fire({
                  customClass: {
                    title: "swal2-title",
                  },
                  position: "middle",
                  icon: "success",
                  title: `${user?.email} you successfully update your data`,
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
              setUpdateLoading(false);

              console.log(updateUserData);
            });
        }
        console.log(uploadImg);
      });
  };
  return (
    <div className="mt-5">
      <h1 className="text-xl text-center mb-3">Edit profile</h1>
      <form
        className=" w-full max-w-xs px-5 py-5 header rounded-xl lg:max-w-lg "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mx-auto w-[70%]">
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            class="input input-bordered w-full max-w-xs input-border-style"
            name="name"
          />

          <p className="mt-3">
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              class="input input-bordered w-full max-w-xs"
              name="email"
              disabled
              value={user?.email}
            />
          </p>
          <p className="mt-3">
            <input
              {...register("number")}
              className="input input-bordered w-full max-w-xs input-border-style mt-5"
              placeholder="Update Number"
              type="text"
              class="input input-bordered w-full max-w-xs"
              name="number"
            />
          </p>
          <p className="mt-3">
            <input
              {...register("address")}
              className="w-full h-10 px-4 text-sm peer bg-gray-100 outline-none "
              placeholder="Update Address"
              type="text"
              class="input input-bordered w-full max-w-xs"
              name="address"
            />
          </p>
          <p className="mt-3">
            <input
              {...register("institude")}
              className="w-full h-10 px-4 text-sm peer bg-gray-100 outline-none"
              placeholder="Update Institude"
              type="text"
              class="input input-bordered w-full max-w-xs"
              name="institude"
            />
          </p>

          <p className="mt-3">
            <span>Update Image</span>
            <input
              {...register("image")}
              className="w-full h-10 px-4 text-sm peer bg-gray-100 outline-none mt-5"
              placeholder="Update Image"
              type="file"
              class="input input-bordered w-full max-w-xs"
              name="image"
            />
          </p>

          <p className="mt-3">
            {" "}
            <button
              class={
                updateLoading
                  ? "btn btn-primary text-center  w-full max-w-xs loading"
                  : "btn btn-primary text-center  w-full max-w-xs"
              }
            >
              {updateLoading ? "Updating..." : "Update"}
            </button>
          </p>
        </div>
      </form>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      ></ToastContainer>
    </div>
  );
};

export default EditProfile;
