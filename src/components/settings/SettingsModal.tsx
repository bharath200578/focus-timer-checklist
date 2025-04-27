import React from 'react';
import { X, Bell, Moon, Clock, Target, ArrowLeft } from 'lucide-react';
import { useTimerStore } from '../../store/timerStore';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { settings, updateSettings } = useTimerStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center">
          <button
            onClick={onClose}
            className="mr-3 rounded-full p-1.5 text-gray-500 hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
        </div>

        {/* Timer Settings */}
        <div className="mb-6">
          <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900">
            <Clock className="mr-2 h-5 w-5" />
            Timer
          </h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Focus Duration (minutes)
              </label>
              <input
                type="number"
                value={settings.focus / 60}
                onChange={(e) => updateSettings({ focus: parseInt(e.target.value) * 60 })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Short Break Duration (minutes)
              </label>
              <input
                type="number"
                value={settings.shortBreak / 60}
                onChange={(e) => updateSettings({ shortBreak: parseInt(e.target.value) * 60 })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Long Break Duration (minutes)
              </label>
              <input
                type="number"
                value={settings.longBreak / 60}
                onChange={(e) => updateSettings({ longBreak: parseInt(e.target.value) * 60 })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Long Break Interval (sessions)
              </label>
              <input
                type="number"
                value={settings.longBreakInterval}
                onChange={(e) => updateSettings({ longBreakInterval: parseInt(e.target.value) })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Automation Settings */}
        <div className="mb-6">
          <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900">
            <Target className="mr-2 h-5 w-5" />
            Automation
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Auto-start Breaks</h4>
                <p className="text-sm text-gray-500">Automatically start breaks when a focus session ends</p>
              </div>
              <button
                onClick={() => updateSettings({ autoStartBreaks: !settings.autoStartBreaks })}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  settings.autoStartBreaks ? 'bg-primary-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.autoStartBreaks ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Auto-start Focus Sessions</h4>
                <p className="text-sm text-gray-500">Automatically start the next focus session after a break</p>
              </div>
              <button
                onClick={() => updateSettings({ autoStartPomodoros: !settings.autoStartPomodoros })}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  settings.autoStartPomodoros ? 'bg-primary-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.autoStartPomodoros ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900">
            <Bell className="mr-2 h-5 w-5" />
            Preferences
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Notifications</h4>
                <p className="text-sm text-gray-500">Enable desktop notifications</p>
              </div>
              <button
                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Dark Mode</h4>
                <p className="text-sm text-gray-500">Switch to dark theme</p>
              </div>
              <button
                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}