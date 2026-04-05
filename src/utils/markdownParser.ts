import type { Task } from '@/types'

/**
 * Parses an Obsidian markdown file and returns all incomplete tasks.
 * Matches lines of the form:
 *   - [ ] Task title
 *   - [ ] Task title :: goal text
 */
export function parseObsidianTasks(markdown: string, filePath: string): Task[] {
  const tasks: Task[] = []
  const lines = markdown.split('\n')

  lines.forEach((line, index) => {
    const match = line.match(/^- \[ \] (.+)$/)
    if (!match) return

    const content = match[1].trim()
    const separatorIdx = content.indexOf(' :: ')

    const title = separatorIdx !== -1
      ? content.slice(0, separatorIdx).trim()
      : content
    const goal = separatorIdx !== -1
      ? content.slice(separatorIdx + 4).trim() || undefined
      : undefined

    tasks.push({
      id: `${filePath}:${index}`,
      title,
      goal,
      completed: false,
      filePath,
      lineIndex: index,
    })
  })

  return tasks
}

/**
 * Replaces `- [ ]` with `- [x]` on the given line index.
 * Returns the updated markdown string.
 */
export function completeTask(markdown: string, lineIndex: number): string {
  const lines = markdown.split('\n')
  if (lineIndex >= 0 && lineIndex < lines.length) {
    lines[lineIndex] = lines[lineIndex].replace('- [ ]', '- [x]')
  }
  return lines.join('\n')
}
