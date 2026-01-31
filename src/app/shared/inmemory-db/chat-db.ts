import { ChatCollection, ChatHistory } from "../models/chat.model";

export class ChatDB {
  public static user = [
    {
      id: "7863a6802ez0e277a0f98534",
      name: "Khalifa",
      avatar: "assets/images/avatars/pfp-placeholder.jpg",
      status: "online",
      chatInfo: [
        {
          chatId: "89564a680b3249760ea21fe77",
          contactId: "323sa680b3249760ea21rt47",
          contactName: "CRNK Assistant",
          unread: 4,
          lastChatTime: "2017-06-12T02:10:18.931Z"
        },
        {
          chatId: "3289564a680b2134760ea21fe7753",
          contactId: "14663a3406eb47ffa63d4fec9429cb71",
          contactName: "Betty Diaz",
          unread: 0,
          lastChatTime: "2019-03-10T02:10:18.931Z"
        }
      ]
    }
  ];
  public static contacts = [
    {
      id: "323sa680b3249760ea21rt47",
      name: "CRNK Assistant",
      avatar: "assets/images/logos/CRNK/CRNK 2-2 NBG.png",
      status: "online",
      mood: ""
    }
  ];
  public static chatCollection: ChatCollection[] = [
    {
      id: "89564a680b3249760ea21fe77",
      lastMessage: {
        contactId: "323sa680b3249760ea21rt47",
        text: "CRNK assistant also sent this.",
        time: "2018-02-10T08:45:28.291Z"
      },
      chats: [
        {
          contactId: "323sa680b3249760ea21rt47",
          text: "Hi, how can i help you.",
          time: "2018-02-10T08:45:28.291Z"
        },
        {
          contactId: "7863a6802ez0e277a0f98534",
          text: "What can you do?.",
          time: "2018-02-10T08:45:28.291Z"
        },
        {
          contactId: "323sa680b3249760ea21rt47",
          text: "I can provide you with information about CRNK, FAQs, support information, car assistance, and more.",
          time: "2018-02-10T08:45:28.291Z"
        },
        {
          contactId: "7863a6802ez0e277a0f98534",
          text: "Okay",
          time: "2018-02-10T08:45:28.291Z"
        },
      ]
    },
    {
      id: "3289564a680b2134760ea21fe7753",
      lastMessage: {
        contactId: "323sa680b3249760ea21rt47",
        text: "CRNK assistant sent this.",
        time: "2018-02-10T08:45:28.291Z"
      },

      chats: [
        {
          contactId: "323sa680b3249760ea21rt47",
          text: "Hi, how can i help you.",
          time: "2018-02-10T08:45:28.291Z"
        },
        {
          contactId: "7863a6802ez0e277a0f98534",
          text: "What can you do?.",
          time: "2018-02-10T08:45:28.291Z"
        },
        {
          contactId: "323sa680b3249760ea21rt47",
          text: "I can provide you with information about CRNK, FAQs, support information, car assistance, and more.",
          time: "2018-02-10T08:45:28.291Z"
        },
        {
          contactId: "7863a6802ez0e277a0f98534",
          text: "Okay",
          time: "2018-02-10T08:45:28.291Z"
        },
      ]
    }
  ];

  public static chatHistory: ChatHistory = {
    history: [
      {
        id: "89564a680b3249760ea21fe77",
        lastMessage: {
          contactId: "323sa680b3249760ea21rt47",
          text: "CRNK assistant also sent this.",
          time: "2018-02-10T08:45:28.291Z"
        },
        chats: [
          {
            contactId: "323sa680b3249760ea21rt47",
            text: "Hi, how can i help you.",
            time: "2018-02-10T08:45:28.291Z"
          },
          {
            contactId: "7863a6802ez0e277a0f98534",
            text: "What can you do?.",
            time: "2018-02-10T08:45:28.291Z"
          },
          {
            contactId: "323sa680b3249760ea21rt47",
            text: "I can provide you with information about CRNK, FAQs, support information, car assistance, and more.",
            time: "2018-02-10T08:45:28.291Z"
          },
          {
            contactId: "7863a6802ez0e277a0f98534",
            text: "Okay",
            time: "2018-02-10T08:45:28.291Z"
          },
        ]
      },
      {
        id: "3289564a680b2134760ea21fe7753",
        lastMessage: {
          contactId: "323sa680b3249760ea21rt47",
          text: "CRNK assistant sent this.",
          time: "2018-02-10T08:45:28.291Z"
        },

        chats: [
          {
            contactId: "323sa680b3249760ea21rt47",
            text: "Hi, how can i help you.",
            time: "2018-02-10T08:45:28.291Z"
          },
          {
            contactId: "7863a6802ez0e277a0f98534",
            text: "What can you do?.",
            time: "2018-02-10T08:45:28.291Z"
          },
          {
            contactId: "323sa680b3249760ea21rt47",
            text: "I can provide you with information about CRNK, FAQs, support information, car assistance, and more.",
            time: "2018-02-10T08:45:28.291Z"
          },
          {
            contactId: "7863a6802ez0e277a0f98534",
            text: "Okay",
            time: "2018-02-10T08:45:28.291Z"
          },
        ]
      }
    ]
  };
}
