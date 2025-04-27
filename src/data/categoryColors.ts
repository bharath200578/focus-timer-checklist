import { TaskCategory } from '../types';

export const CATEGORY_COLORS: Record<TaskCategory, { bg: string; text: string; border: string }> = {
  work: {
    bg: 'bg-red-100',
    text: 'text-red-600',
    border: 'border-red-200',
  },
  study: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    border: 'border-blue-200',
  },
  creative: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    border: 'border-purple-200',
  },
  personal: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    border: 'border-green-200',
  },
  health: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-600',
    border: 'border-yellow-200',
  },
};

export const CATEGORY_NAMES: Record<TaskCategory, string> = {
  work: 'Work',
  study: 'Study',
  creative: 'Creative',
  personal: 'Personal',
  health: 'Health',
};