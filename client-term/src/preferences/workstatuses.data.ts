interface WorkStatus {
  name: string,
  bool: boolean,
  id: number,
  comment: string,
}

const workStatuses: Array<WorkStatus> = [
  {
    name: "не работаю",
    bool: false,
    id: 0,
    comment: "Или забыл отметиться о приходе =)",
  },
  {
    name: "работаю",
    bool: true,
    id: 1,
    comment: "Или забыл отметиться об уходе =)",
  },
];

export default workStatuses;
