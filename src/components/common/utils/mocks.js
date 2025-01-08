
export const MOCK_ITINERARIES = [
    {
        _id: "100000000000000000000001",
        userId: "000000000000000000000001",
        name: "Trip to the beach",
        description: "A relaxing trip to the beach with friends. We'll enjoy the sun, surf, and sand for a few days.",
        startDate: "2022-12-01T00:00:00.000Z",
        endDate: "2022-12-05T00:00:00.000Z",
        category: "RELAX",
        createdAt: "2022-12-01T00:00:00.000Z",
        updatedAt: "2022-12-01T00:00:00.000Z",
        activities: [
            { name: "Surfing", startDate: "2022-12-02T00:00:00.000Z" },
            { name: "Sunbathing", startDate: "2022-12-03T00:00:00.000Z" },
            { name: "Beach volleyball", startDate: "2022-12-04T00:00:00.000Z" }
        ],
        comments: [],
        reviews: []
    },
    {
        _id: "100000000000000000000002",
        userId: "000000000000000000000002",
        name: "Mountain hiking adventure",
        description: "An exciting hiking trip in the mountains. We'll explore beautiful trails and enjoy breathtaking views.",
        startDate: "2023-01-15T00:00:00.000Z",
        endDate: "2023-01-20T00:00:00.000Z",
        category: "ADVENTURE",
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
        activities: [
            { name: "Trail 1", startDate: "2023-01-16T00:00:00.000Z" },
            { name: "Trail 2", startDate: "2023-01-17T00:00:00.000Z" },
            { name: "Trail 3", startDate: "2023-01-18T00:00:00.000Z" }
        ],
        comments: [],
        reviews: []
    }
]

export const users = [
    {
        id: "user1",
        password: 'password1',
        roles: ['admin', 'user'],
        name: 'John Doe',
        photo: 'photo1.jpg',
        biography: 'Lorem ipsum dolor sit amet.',
        registrationDate: '2021-01-01',
        accountStatus: 'active',
        friendRequestStatus: 'none',
        verifiedEmail: true,
        plan: 'pro',
        addons: ['all']
    },
    {
        id: "user2",
        password: 'password2',
        roles: ['user'],
        name: 'Jane Smith',
        photo: 'photo2.jpg',
        biography: 'Consectetur adipiscing elit.',
        registrationDate: '2021-02-01',
        accountStatus: 'active',
        friendRequestStatus: 'pending',
        verifiedEmail: true,
        plan: 'basic',
        addons: ["addon1"]
    },
    {
        id: "user3",
        password: 'password3',
        roles: ['user'],
        name: 'Alice Johnson',
        photo: 'photo3.jpg',
        biography: 'Sed do eiusmod tempor incididunt.',
        registrationDate: '2021-03-01',
        accountStatus: 'inactive',
        friendRequestStatus: 'accepted',
        verifiedEmail: false,
        plan: 'pro',
        addons: ['addon1', 'addon2']
    }
];