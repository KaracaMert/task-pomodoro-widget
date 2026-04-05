// Minimal type declarations for the File System Access API
// https://wicg.github.io/file-system-access/

interface FileSystemFileHandle {
  readonly kind: 'file'
  readonly name: string
  getFile(): Promise<File>
  createWritable(options?: { keepExistingData?: boolean }): Promise<FileSystemWritableFileStream>
}

interface FileSystemWritableFileStream extends WritableStream {
  write(data: BufferSource | Blob | string): Promise<void>
  close(): Promise<void>
}

interface OpenFilePickerOptions {
  types?: Array<{ description?: string; accept: Record<string, string[]> }>
  excludeAcceptAllOption?: boolean
  multiple?: boolean
}

interface Window {
  showOpenFilePicker(options?: OpenFilePickerOptions): Promise<FileSystemFileHandle[]>
}
