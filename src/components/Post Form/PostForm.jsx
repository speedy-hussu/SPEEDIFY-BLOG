import React, { useCallback, useEffect, useState } from "react";
import { RTE, Select, Input, ImgInp } from "../index";
import appwriteService from "../../appwrite/database";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./PostForm.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    try {
      if (post) {
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          appwriteService.deleteFile(post.image);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          image: file ? file.$id : undefined,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {
          const fileId = file.$id;
          data.image = fileId;
          const dbPost = await appwriteService.createPost({
            userId: userData.$id,
            ...data,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return (
        value
          .trim()
          .toLowerCase()
          // Remove all chars except letters, numbers, and spaces
          .replace(/[^a-z0-9\s]+/g, "")
          // Replace spaces (one or more) with single hyphen
          .replace(/\s+/g, "-")
          // Remove leading or trailing hyphens
          .replace(/^-+|-+$/g, "")
      );
    }
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="post-form">
      <div className="left-col">
        <div className="inputs-div">
          <Input
            label={"Title"}
            placeholder={"Enter your title"}
            {...register("title", { required: true })}
          />
          <Input
            label={"slug"}
            disabled
            placeholder={"your slug"}
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.target.value), {
                shouldValidate: true,
              });
            }}
          />

          <div className="select-img-div">
            <ImgInp
              label={"image"}
              type={"file"}
              accept={"image/png, image/jpg,image/jpeg"}
              {...register("image", { required: !post })}
            />
          </div>
          {/* {post && (
            <div>
              <img src={appwriteService.filePreview(post.image)} />
            </div>
          )} */}
          <Select
            options={["active", "inActive"]}
            label={"status"}
            {...register("status", { required: true })}
          />
        </div>
        <button className="sub-btn" type="submit">
          {post ? "update" : "submit"}
        </button>
      </div>
      <div className="right-col">
        <div className="rte">
          <RTE
            name="content"
            control={control}
            defaultValues={getValues("content")}
          />
        </div>
      </div>
    </form>
  );
}

export default PostForm;
