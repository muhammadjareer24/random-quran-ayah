interface AyahType {
  text: string
  chapter: number
  verse: number
}

interface ChapterType {
  name: string
  chapter: number
}

interface InfoType {
  chapters: ChapterType[]
}

interface DisplayProps {
  currentAyah: string
  currentReference: string
}

interface ControlsProps {
  onNewAyah: () => void
  onCopyAyah: () => void
  onWhatsAppShare: () => void
}
