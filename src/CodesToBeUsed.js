

// AVATAR CLICKABLE TO UPLOAD PHOTO
<div
  className="mb-4 flex items-center gap-3 w-fit cursor-pointer"
  onClick={() => inputRef.current.click()}
>
  <Avatar
    sx={{ width: 56, height: 56 }}
    alt=""
    src={signUpForm.image ? URL.createObjectURL(signUpForm.image) : ""}
  />
  <span className="text-sm font-medium text-gray-700">
    Choose profile picture
  </span>
  <input
    type="file"
    onChange={(e) => setSignUpForm({ ...signUpForm, image: e.target.files[0] })}
    accept="image/*"
    ref={inputRef}
    className="hidden"
  />
</div>;
