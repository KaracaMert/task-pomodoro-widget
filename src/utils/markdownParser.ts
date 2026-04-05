import type { Task } from '@/types'

/**
 * Parses an Obsidian markdown file and returns incomplete tasks.
 * Looks for lines matching: - [ ] task title :: goal
 * TODO: Implement in Iteration 4
 */
export function parseObsidianTasks(_markdown: string, _filePath: string): Task[] {
  return []
}

/**
 * Marks a task as complete in the markdown source string.
 * Returns the updated markdown string.
 * TODO: Implement in Iteration 4
 */
export function completeTask(markdown: string, _lineIndex: number): string {
  return markdown
}
