interface Window {
  __colorSchemes?: Record<string, Record<string, string>>;
  __applyTheme?: (mode: string, schemes?: Record<string, Record<string, string>>) => void;
}