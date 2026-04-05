import { describe, it, expect } from 'vitest'
import { parseObsidianTasks, completeTask } from '@/utils/markdownParser'

describe('parseObsidianTasks', () => {
  it('returns empty array for empty markdown', () => {
    expect(parseObsidianTasks('', '/path/to/file.md')).toEqual([])
  })

  it('returns empty array for stub implementation', () => {
    const md = '- [ ] Buy groceries\n- [x] Done task\n- [ ] Write report :: finish Q1'
    const tasks = parseObsidianTasks(md, '/path/to/file.md')
    // Stub returns [] — update this test when implementing Iteration 4
    expect(tasks).toEqual([])
  })
})

describe('completeTask', () => {
  it('returns markdown unchanged for stub implementation', () => {
    const md = '- [ ] Buy groceries'
    expect(completeTask(md, 0)).toBe(md)
  })
})
