const initialBoardKey = "taskBoard";

export { initialBoardKey };

export const getInitialBoard = () => {
  return (
    JSON.parse(localStorage.getItem(initialBoardKey)) || {
      columns: [
        {
          id: 1,
          title: "To do",
          backgroundColor: "#fff",
          cards: [
            {
              id: 1,
              title: "Card title 1",
              description: "users to create, update, and delete",
              date: "25/11/2023",
              assignee: 'kamal',
            },
            {
              id: 2,
              title: "Card title 2",
              description: "users to create, update, and delete",
              date: "25/11/2023",
              assignee: 'Swapnil'
            }
          ],
        },
        {
          id: 2,
          title: "In progress",
          cards: [
            {
              id: 9,
              title: "Card title 9",
              description: "users to create, update, and delete",
              date: "25/11/2023",
              assignee: 'Ankit',
            },
          ],
        },
        {
          id: 3,
          title: "Done",
          cards: [
            {
              id: 10,
              title: "Card title 6",
              description: "users to create, update, and delete",
              date: "25/11/2023",
              assignee: 'Anupam'
            },
            {
              id: 3,
              title: "Card title 3",
              description: "users to create, update, and delete",
              date: "25/11/2023",
              assignee: 'Dev',
            },
          ],
        },
      ],
    }
  );
};
