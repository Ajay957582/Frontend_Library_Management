import React, { useState } from "react";

function SelectBookImage({ setcoverImage, setToFetch }) {
  const [modeOfCoverImage, setModeOfCoverImage] = useState("url");
  function modeOfCoverImageHandler(e) {
    // console.log(e.target.value);
    setModeOfCoverImage(e.target.value);
  }
  function coverImageChange(e) {
    // console.log(e.target.files[0]);
    setcoverImage(e.target.files[0]);
    setToFetch(true);
  }
  return (
    <div className="mb-4">
      <label htmlFor="author" className="block text-gray-700">
        Cover Image
      </label>

      <select
        id=""
        onChange={modeOfCoverImageHandler}
        className="w-full px-2 py-1 border border-gray-300 rounded-md mb-3"
      >
        <option value="url">Url of book cover image</option>
        <option value="browse">Browse image from local storage</option>
      </select>

      {modeOfCoverImage === "url" ? (
        <div>
          <input
            type="text"
            placeholder="Enter url of cover image"
            className="w-full px-2 py-1 border border-gray-300 rounded-md"
            onChange={(e) => {
              setcoverImage(e.target.value);
              setToFetch(false);
            }}
          />
        </div>
      ) : (
        <div>
          <input
            type="file"
            accept="image/*"
            placeholder="Enter url of cover image"
            className="w-full px-2 py-1 border border-gray-300 rounded-md"
            onChange={coverImageChange}
          />
        </div>
      )}
    </div>
  );
}

export default SelectBookImage;
