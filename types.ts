export enum SupportedLanguage {
  ENGLISH = 'English',
  SPANISH = 'Spanish',
  FRENCH = 'French',
  GERMAN = 'German',
  CHINESE = 'Mandarin Chinese',
  JAPANESE = 'Japanese',
  KOREAN = 'Korean',
  HINDI = 'Hindi',
  ARABIC = 'Arabic',
  PORTUGUESE = 'Portuguese',
  ITALIAN = 'Italian',
  RUSSIAN = 'Russian',
  DUTCH = 'Dutch',
  TURKISH = 'Turkish',
  POLISH = 'Polish',
}

export interface FileUploadProps {
  type: 'audio' | 'video';
  onFileSelect: (file: File) => void;
}
