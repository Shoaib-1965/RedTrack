import React from 'react';

interface ProfileHeaderProps {
  userName: string;
  onProfileClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userName, onProfileClick }) => {
  const getInitials = (name: string) => {
    if (!name) return '?';
    const names = name.split(' ');
    if (names.length > 1 && names[1]) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.length > 0 ? name[0].toUpperCase() : '?';
  };

  return (
    <header className="p-4 flex justify-between items-center bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-200/50">
      <div>
        <p className="text-md text-text-secondary">Welcome back,</p>
        <h1 className="text-xl font-bold text-text-primary">{userName}!</h1>
      </div>
      <button onClick={onProfileClick} className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold shadow-md hover:scale-105 transition-transform">
        {getInitials(userName)}
      </button>
    </header>
  );
};

export default ProfileHeader;
