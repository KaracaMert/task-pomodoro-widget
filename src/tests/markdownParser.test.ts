import { describe, it, expect } from 'vitest'
import { parseObsidianTasks, completeTask } from '@/utils/markdownParser'

const SAMPLE_MD = `# Daily Tasks

## Work

- [ ] Write project report :: finish Q1 summary
- [ ] Review pull requests :: merge before EOD
- [x] Set up dev environment :: install all dependencies
- [ ] Fix login bug
- [ ] Update API documentation

## Personal

- [x] Reply to emails
- [ ] Plan weekly schedule :: block focus time
`

describe('parseObsidianTasks', () => {
  it('returns empty array for empty markdown', () => {
    expect(parseObsidianTasks('', 'test.md')).toEqual([])
  })

  it('parses only incomplete tasks', () => {
    const tasks = parseObsidianTasks(SAMPLE_MD, 'test.md')
    expect(tasks).toHaveLength(5)
    expect(tasks.every(t => !t.completed)).toBe(true)
  })

  it('parses title and goal separated by ::', () => {
    const tasks = parseObsidianTasks(SAMPLE_MD, 'test.md')
    expect(tasks[0].title).toBe('Write project report')
    expect(tasks[0].goal).toBe('finish Q1 summary')
  })

  it('parses tasks without a goal', () => {
    const tasks = parseObsidianTasks(SAMPLE_MD, 'test.md')
    const noGoal = tasks.find(t => t.title === 'Fix login bug')
    expect(noGoal).toBeDefined()
    expect(noGoal?.goal).toBeUndefined()
  })

  it('records correct line indices', () => {
    const tasks = parseObsidianTasks(SAMPLE_MD, 'test.md')
    // "Write project report" is on line 4 (0-indexed)
    expect(tasks[0].lineIndex).toBe(4)
  })

  it('skips completed tasks marked with [x]', () => {
    const tasks = parseObsidianTasks(SAMPLE_MD, 'test.md')
    const titles = tasks.map(t => t.title)
    expect(titles).not.toContain('Set up dev environment')
    expect(titles).not.toContain('Reply to emails')
  })

  it('uses filePath in task id', () => {
    const tasks = parseObsidianTasks(SAMPLE_MD, 'Daily Tasks.md')
    expect(tasks[0].id).toContain('Daily Tasks.md')
  })
})

describe('completeTask', () => {
  it('replaces - [ ] with - [x] on the given line', () => {
    const md = '- [ ] Buy groceries'
    expect(completeTask(md, 0)).toBe('- [x] Buy groceries')
  })

  it('only changes the specified line', () => {
    const md = '- [ ] Task one\n- [ ] Task two\n- [ ] Task three'
    const result = completeTask(md, 1)
    expect(result).toBe('- [ ] Task one\n- [x] Task two\n- [ ] Task three')
  })

  it('returns markdown unchanged for out-of-bounds index', () => {
    const md = '- [ ] Only task'
    expect(completeTask(md, 99)).toBe(md)
  })
})
