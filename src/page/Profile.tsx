import { FC } from "react";
import UserInfoSection from "../components/ProfilePage/UserInfoSection";
import UserPostsSection from "../components/ProfilePage/UserPostsSection";

const ProfilePage: FC = () => {
    return (
        <div className="post-page-container space-y-8">
            <UserInfoSection />
            <UserPostsSection />
        </div>
    )
}

export default ProfilePage