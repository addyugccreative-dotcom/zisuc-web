import React from 'react';
import { CustomizerSettings } from '../types';

interface AnnouncementBarProps {
  settings: CustomizerSettings;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ settings }) => {
  return (
    <div
      className="w-full overflow-hidden whitespace-nowrap py-3 relative border-b select-none"
      style={{
        backgroundColor: settings.colorAccent,
        borderColor: `${settings.colorText}1f`,
        color: settings.colorText,
      }}
    >
      <div className="flex w-full overflow-hidden">
        <div 
          className="flex whitespace-nowrap animate-marquee font-mono text-[9px] sm:text-xs uppercase tracking-widest"
          style={{
            animationDuration: `${settings.announcementSpeed}s`
          }}
        >
          {/* First segment */}
          <div className="flex shrink-0">
            {Array(5).fill(null).map((_, i) => (
              <span key={`a-${i}`} className="px-6 flex items-center">
                {settings.announcementText}
                <span className="ml-4 font-serif text-[#e76f51]">✦</span>
              </span>
            ))}
          </div>
          {/* Duplicate identical segment for seamless infinite cycle translation */}
          <div className="flex shrink-0">
            {Array(5).fill(null).map((_, i) => (
              <span key={`b-${i}`} className="px-6 flex items-center">
                {settings.announcementText}
                <span className="ml-4 font-serif text-[#e76f51]">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

