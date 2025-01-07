
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