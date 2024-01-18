// import React from "react";

import React, { useState } from "react";
import SelectBookImage from "./SelectBookImage";
function Addbook({ setIsLoading, setSnackMsg, setSnakeBar, setSeverity }) {
  const [bookName, setBookName] = useState("");
  const [bookId, setBookId] = useState("");
  const [coverImage, setcoverImage] = useState("");
  const [bookPdf, setBookPdf] = useState("");
  const [author, setAuthor] = useState("");
  const [toFetch, setToFetch] = useState(false);
  const url = "https://api.cloudinary.com/v1_1/drvpyybiy/image/upload";
  //   return <div> this is add Addbook form</div>;
  // }

  // export default Addbook;
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsLoading(true);
      if (toFetch) {
        const formDetails = new FormData();
        formDetails.append("file", coverImage);
        formDetails.append(
          "upload_preset",
          "library_management_profile_pic_unsigned_preset"
        );
        const res = await fetch(url, { method: "POST", body: formDetails });
        const dataFromCloudinary = await res.json();
        console.log(dataFromCloudinary);
        setcoverImage(dataFromCloudinary.url);
      }
      fetch("https://backed-for-library-management.onrender.com/addbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookName,
          bookId,
          coverImage,
          bookPdf,
          author,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          if (data.message === "Network Issues !! please try again") {
            setSeverity("error");
            setSnackMsg("Please try again Later");
            setSnakeBar(true);
            return;
          }
          if (data.message === "Book already exists !! Add another Book") {
            setSeverity("warning");
            setSnackMsg("This BookId Already Exists");
            setSnakeBar(true);
            return;
          }
          if (data.message === "Book Added successfully") {
            setSeverity("success");
            setSnackMsg("Book Added successfully");
            setSnakeBar(true);
            return;
          }
          // console.log(data);
        });
    } catch (error) {
      console.log(error, "error from form submit handler in add books section");
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-16 text-2xl">Add New Book</h1>
      {/* <div
        className="w-64 h-64 mb-4 border border-gray-300 rounded-lg"
        style={{
          // backgroundImage: url("${coverImage}"),
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div> */}

      <form className="w-8/12 mt-16" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="bookName" className="block text-gray-700">
            Book Name
          </label>
          <input
            id="bookName"
            type="text"
            className="w-full px-2 py-1 border border-gray-300 rounded-md"
            value={bookName}
            onChange={(e) => {
              setBookName(e.target.value);
            }}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bookId" className="block text-gray-700">
            Book ID
          </label>
          <input
            id="bookId"
            type="text"
            className="w-full px-2 py-1 border border-gray-300 rounded-md"
            value={bookId}
            onChange={(e) => {
              setBookId(e.target.value);
            }}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700">
            Author
          </label>
          <input
            id="author"
            type="text"
            className="w-full px-2 py-1 border border-gray-300 rounded-md"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            required
          />
        </div>

        <SelectBookImage
          setcoverImage={setcoverImage}
          setToFetch={setToFetch}
        />

        <div className="mb-4">
          <label htmlFor="pdfLink" className="block text-gray-700">
            PDF Link
          </label>
          <input
            id="pdfLink"
            type="text"
            className="w-full px-2 py-1 border border-gray-300 rounded-md"
            value={bookPdf}
            onChange={(e) => {
              setBookPdf(e.target.value);
            }}
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md mx-auto"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default Addbook;
