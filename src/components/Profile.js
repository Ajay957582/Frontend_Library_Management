import React from "react";

function Profile() {
  return (
    <div className="flex flex-col w-full md:w-1/2 mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* <div className="flex items-center justify-center mb-4">
        {picture && (
          <img
            className="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
            src={picture}
            alt={name}
          />
        )}
      </div> */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">Ajay More</h2>
      <p className="text-gray-600 mb-8">
        i am a computer science engineering student
      </p>
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Enrollment number:
      </h2>
      <p className="text-gray-600 mb-8">0822CS211016</p>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Email:</h2>
      <p className="text-gray-600 mb-8">ajaymore1234.indore@gmail.com</p>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Identity :</h2>
      <p className="text-gray-600 mb-8">Student</p>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Total Fine :</h2>
      <p className="text-gray-600 mb-8">1234$</p>
      {/* Add additional profile details here (e.g., email, location, etc.) */}
    </div>
  );
}

export default Profile;
