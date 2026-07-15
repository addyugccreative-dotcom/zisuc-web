import React, { useState } from 'react';
import { Download, Sliders, Code, Layout, Palette, Settings, Sparkles, FolderOpen, FileText } from 'lucide-react';
import JSZip from 'jszip';
import { CustomizerSettings } from '../types';
import { themeFiles } from '../theme-source';

interface ThemeCustomizerProps {
  settings: CustomizerSettings;
  onChangeSettings: (updater: (prev: CustomizerSettings) => CustomizerSettings) => void;
  isMobileView: boolean;
  onToggleView: () => void;
}

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  settings,
  onChangeSettings,
  isMobileView,
  onToggleView,
}) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'code'>('editor');
  const [selectedFileIdx, setSelectedFileIdx] = useState(0);
  const [isZipping, setIsZipping] = useState(false);

  // Quick helper to download Shopify schema zip file dynamically
  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      themeFiles.forEach((file) => {
        // Replace theme variables inside the downloaded files with the user's customized colors, if requested!
        // This is a dynamic Shopify exporter!
        let content = file.content;
        if (file.path === 'config/settings_data.json') {
          // Dynamically compile customized theme settings into settings_data.json
          const customSettingsData = {
            current: "Default",
            presets: {
              Default: {
                color_bg: settings.colorBg,
                color_bg_secondary: settings.colorBgSecondary,
                color_text: settings.colorText,
                color_accent: settings.colorAccent,
                color_button: settings.colorButton,
                color_button_text: settings.colorButtonText,
                color_button_hover: settings.colorButtonHover,
                animation_speed: settings.animationSpeed
              }
            }
          };
          content = JSON.stringify(customSettingsData, null, 2);
        }

        zip.file(file.path, content);
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'wave-peaches-theme.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to create theme zip file', err);
    } finally {
      setIsZipping(false);
    }
  };

  const updateSetting = (key: keyof CustomizerSettings, value: any) => {
    onChangeSettings((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="w-full lg:w-96 shrink-0 bg-stone-900 text-stone-100 flex flex-col h-full border-r border-stone-800 shadow-2xl select-none font-sans text-xs sm:text-sm">
      {/* Visual Customizer Header title block */}
      <div className="p-4 sm:p-5 border-b border-stone-850 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <h2 className="font-semibold text-sm uppercase tracking-widest text-[#faf3ee]">Shopify Wave Editor</h2>
        </div>
        <button
          onClick={handleDownloadZip}
          disabled={isZipping}
          className="flex items-center gap-1.5 py-1.5 px-3 bg-amber-400 hover:bg-amber-300 disabled:bg-stone-700 text-stone-900 rounded font-bold uppercase tracking-wider text-[10px] sm:text-xs transition active:scale-95 duration-150 shadow"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isZipping ? 'Zipping...' : 'Export Theme'}</span>
        </button>
      </div>

      {/* Editor/Code Mode selectors */}
      <div className="flex border-b border-stone-850 font-medium">
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 border-b-2 transition ${
            activeTab === 'editor'
              ? 'border-amber-400 text-amber-300 bg-stone-850/50'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Customizer Options</span>
        </button>

        <button
          onClick={() => setActiveTab('code')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 border-b-2 transition ${
            activeTab === 'code'
              ? 'border-amber-400 text-amber-300 bg-stone-850/50'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>Theme Code Browser</span>
        </button>
      </div>

      {/* Main Tab Bodys */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
        {activeTab === 'editor' ? (
          <>
            {/* Color Palette controls */}
            <div className="space-y-4">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider font-mono text-[10px] text-stone-450 border-b border-stone-850 pb-1.5">
                <Palette className="w-3.5 h-3.5 text-stone-400" />
                <span>Theme Color Variables</span>
              </span>

              {/* Primary Background */}
              <div className="flex justify-between items-center bg-stone-850 p-2.5 rounded border border-stone-800">
                <div>
                  <p className="font-semibold text-stone-200">Page Canvas Background</p>
                  <p className="text-[10px] text-stone-450 font-mono">settings.color_bg</p>
                </div>
                <input
                  type="color"
                  value={settings.colorBg}
                  onChange={(e) => updateSetting('colorBg', e.target.value)}
                  className="w-10 h-7 rounded border border-stone-700 bg-transparent cursor-pointer"
                />
              </div>

              {/* Secondary background */}
              <div className="flex justify-between items-center bg-stone-850 p-2.5 rounded border border-stone-800">
                <div>
                  <p className="font-semibold text-stone-200">Secondary Cream Block</p>
                  <p className="text-[10px] text-stone-450 font-mono">settings.color_bg_secondary</p>
                </div>
                <input
                  type="color"
                  value={settings.colorBgSecondary}
                  onChange={(e) => updateSetting('colorBgSecondary', e.target.value)}
                  className="w-10 h-7 rounded border border-stone-700 bg-transparent cursor-pointer"
                />
              </div>

              {/* Primary Text */}
              <div className="flex justify-between items-center bg-stone-850 p-2.5 rounded border border-stone-800">
                <div>
                  <p className="font-semibold text-stone-200">Text & Layout Accents</p>
                  <p className="text-[10px] text-stone-450 font-mono">settings.color_text</p>
                </div>
                <input
                  type="color"
                  value={settings.colorText}
                  onChange={(e) => updateSetting('colorText', e.target.value)}
                  className="w-10 h-7 rounded border border-stone-700 bg-transparent cursor-pointer"
                />
              </div>

              {/* Accent details background */}
              <div className="flex justify-between items-center bg-stone-850 p-2.5 rounded border border-stone-800">
                <div>
                  <p className="font-semibold text-stone-200">Sale & Highlights Accent</p>
                  <p className="text-[10px] text-stone-450 font-mono">settings.color_accent</p>
                </div>
                <input
                  type="color"
                  value={settings.colorAccent}
                  onChange={(e) => updateSetting('colorAccent', e.target.value)}
                  className="w-10 h-7 rounded border border-stone-700 bg-transparent cursor-pointer"
                />
              </div>

              {/* Add to Cart button back */}
              <div className="flex justify-between items-center bg-stone-850 p-2.5 rounded border border-stone-800">
                <div>
                  <p className="font-semibold text-stone-200">Primary Product Button</p>
                  <p className="text-[10px] text-stone-450 font-mono">settings.color_button</p>
                </div>
                <input
                  type="color"
                  value={settings.colorButton}
                  onChange={(e) => updateSetting('colorButton', e.target.value)}
                  className="w-10 h-7 rounded border border-stone-700 bg-transparent cursor-pointer"
                />
              </div>
            </div>

            {/* Typography / Custom texts */}
            <div className="space-y-4">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider font-mono text-[10px] text-stone-450 border-b border-stone-850 pb-1.5">
                <Layout className="w-3.5 h-3.5 text-stone-400" />
                <span>Text Content Schema</span>
              </span>

              {/* Logo customizer */}
              <div className="flex flex-col bg-stone-850 p-2.5 rounded border border-stone-800 gap-1.5">
                <label className="font-semibold text-stone-200">Primary Logo Brand Name</label>
                <input
                  type="text"
                  value={settings.logoText}
                  onChange={(e) => updateSetting('logoText', e.target.value)}
                  className="w-full bg-stone-900 border border-stone-750 px-3 py-1.5 text-xs text-stone-200"
                />
              </div>

              {/* Announcement marquee */}
              <div className="flex flex-col bg-stone-850 p-2.5 rounded border border-stone-800 gap-1.5">
                <label className="font-semibold text-stone-200">Announcement Bar Ribbon</label>
                <textarea
                  value={settings.announcementText}
                  onChange={(e) => updateSetting('announcementText', e.target.value)}
                  className="w-full bg-stone-900 border border-stone-750 px-3 py-1.5 text-xs text-stone-200 h-16 resize-none"
                />
              </div>

              {/* Hero headline banner */}
              <div className="flex flex-col bg-stone-850 p-2.5 rounded border border-stone-800 gap-1.5">
                <label className="font-semibold text-stone-200">Hero Section Heading</label>
                <input
                  type="text"
                  value={settings.heroHeading}
                  onChange={(e) => updateSetting('heroHeading', e.target.value)}
                  className="w-full bg-stone-900 border border-stone-750 px-3 py-1.5 text-xs text-stone-200"
                />
              </div>
            </div>

            {/* Motion & Animations speed slider */}
            <div className="space-y-4">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider font-mono text-[10px] text-stone-450 border-b border-stone-850 pb-1.5">
                <Settings className="w-3.5 h-3.5 text-stone-400" />
                <span>Animation & Dynamics Rate</span>
              </span>

              {/* Ticker speed */}
              <div className="flex flex-col bg-stone-850 p-2.5 rounded border border-stone-800 gap-2">
                <div className="flex justify-between items-center text-stone-200">
                  <span className="font-semibold">Ticker Rotation speed list</span>
                  <span className="font-mono text-xs opacity-80">{settings.announcementSpeed}s</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  value={settings.announcementSpeed}
                  onChange={(e) => updateSetting('announcementSpeed', parseInt(e.target.value))}
                  className="w-full accent-amber-400 bg-stone-800 h-1"
                />
              </div>

              {/* Transitions rate options picker */}
              <div className="flex flex-col bg-stone-850 p-2.5 rounded border border-stone-800 gap-2">
                <label className="font-semibold text-stone-200">Layout transitions speed rate</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['0.15s', '0.3s', '0.5s'] as const).map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => updateSetting('animationSpeed', rate)}
                      className={`text-[10px] font-bold py-1.5 px-1 uppercase rounded border transition ${
                        settings.animationSpeed === rate
                          ? 'bg-amber-400 text-stone-900 border-amber-400'
                          : 'bg-stone-900 text-stone-400 border-stone-750 hover:bg-stone-800'
                      }`}
                    >
                      {rate === '0.15s' ? 'Vivid' : rate === '0.3s' ? 'Natural' : 'Luxurious'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Emulator Screen toggle helper button */}
              <div className="pt-2">
                <button
                  onClick={onToggleView}
                  className="w-full text-center py-2.5 border border-amber-400/40 hover:border-amber-400 text-[10px] sm:text-xs text-amber-300 font-bold uppercase tracking-widest rounded bg-stone-850 select-none shadow hover:bg-stone-800/80 transition"
                >
                  Viewport: {isMobileView ? 'Mobile Screen' : 'Desktop Screen'} (Toggle)
                </button>
              </div>
            </div>
          </>
        ) : (
          /* File code browser with 100% full un-truncated source text block representation */
          <div className="space-y-4 h-full flex flex-col">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider font-mono text-[10px] text-stone-450 border-b border-stone-850 pb-1.5 shrink-0">
              <FolderOpen className="w-3.5 h-3.5 text-stone-400" />
              <span>Shopify Theme File Tree</span>
            </span>

            {/* Micro selector */}
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto shrink-0 bg-stone-950 p-2 rounded scrollbar-thin">
              {themeFiles.map((file, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedFileIdx(idx)}
                  className={`flex items-center space-x-2 text-[10px] text-left p-1.5 rounded transition ${
                    selectedFileIdx === idx
                      ? 'bg-amber-400 text-stone-900 font-bold'
                      : 'text-stone-300 hover:bg-stone-850'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span className="truncate">{file.path}</span>
                </button>
              ))}
            </div>

            {/* Read-Only text code area block */}
            <div className="flex-1 flex flex-col min-h-0 bg-stone-950 border border-stone-850 rounded">
              <div className="px-3 py-2 bg-stone-900 flex justify-between items-center text-[10px] text-stone-450 font-mono border-b border-stone-850">
                <span>{themeFiles[selectedFileIdx].path}</span>
                <span className="uppercase">{themeFiles[selectedFileIdx].category}</span>
              </div>
              <textarea
                readOnly
                value={themeFiles[selectedFileIdx].content}
                className="w-full flex-1 p-3 bg-stone-950 text-stone-250 text-[10px] font-mono border-none outline-none resize-none overflow-auto"
                style={{ tabSize: 2 }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
