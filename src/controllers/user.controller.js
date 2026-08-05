import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js"
import { User, user } from "../models/user.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
    //step-1 // get user details form frontend
    // 2 validation 
    //3 check if user is already exists : username and email
    //4 check for images ,and for avatar
    //5 upload them to cloudinary , avatar
    //6 create user object - create entry in db
    //7 remove password and refreshtoken field from response
    //8 check for user creation 
    //9 return res

    //step-1
    const { fullname, email, username, password } = req.body
    console.log("email:", email);

    //step-2
    if ([fullname, email, username, password].some((field) =>
        field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }
    //step-3
    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    //step-4
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")

    }
    //step-5
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    //step-6
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || " ",
        email,
        password,
        username: username.toLowerCase()
    })
    //step-7 (these 2 fields we do not want ) & //step-8
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registring user")
    }

    //step-9 (return response)
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )


})


export { registerUser }