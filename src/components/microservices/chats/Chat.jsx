import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    createMessage,
    updateMessageStatusById,
    deleteMessageById,
    getChatBetweenUsersByWriterUserIdAndReceiverUserId
} from '@/services/microservices/chatsService';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserContext } from '@/contexts/UserContext';
import GoToLogin from '@/components/common/GoToLogin';
import { useParams } from 'react-router-dom';
import GoToPricing from '@/components/common/GoToPricing';
import { Trash } from 'lucide-react';

const messageSchema = z.object({
    messageContent: z.string().min(1, 'Message is required').max(500, 'Message must be at most 500 characters long'),
});

const Chat = () => {

    const { userId } = useParams();  
    console.log(`Starting chat with user ${userId}`);
    const { loggedInUser } = useContext(UserContext);
    if (!loggedInUser?.id) {
        return <GoToLogin />;
    }
    // if user plan is not Pro, return a message to pricing page
    if (loggedInUser?.plan !== 'pro') {
        return <GoToPricing />;
    }
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const form = useForm({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            messageContent: '',
        },
    });

    const fetchMessages = async () => {
        setIsLoading(true);
        try {
            const fetchedMessages = await getChatBetweenUsersByWriterUserIdAndReceiverUserId(loggedInUser?.id, userId);
            console.log(`Fetched messages: ${fetchedMessages}`);
            if (fetchedMessages) {
                setMessages(fetchedMessages);
                // Mark all unread messages as read
                fetchedMessages.forEach(message => {
                    if (message.messageStatus === 'UNREAD' && message.receiverUserId === loggedInUser.id) {
                        updateMessageStatusById(message._id);
                    }
                });
            }
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        } finally {
            setIsLoading(false);
        }

    };
    useEffect(() => {
        fetchMessages();
    }, [loggedInUser, userId]);

    const onSubmit = async (data) => {
        const newMessage = {
            writerUserId: loggedInUser.id,
            receiverUserId: userId,
            messageContent: data.messageContent,
        };

        const createdMessage = await createMessage(newMessage);
        if (createdMessage) {
            await fetchMessages(); // Reload chat messages
            form.reset();
        }
    };

    const handleDeleteMessage = async (messageId) => {
        const deletedMessage = await deleteMessageById(messageId);
        if (deletedMessage) {
            await fetchMessages(); // Reload chat messages
        }
        setMessages(messages.filter(message => message._id !== messageId));

    };



    return (
        <div className="flex flex-col h-[600px] border rounded-lg">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Your chat</h2>
            </div>
            <ScrollArea className="flex-grow p-4">
                {isLoading ? (
                    <p>Loading messages...</p>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message._id}
                            className={`mb-4 ${message.writerUserId === loggedInUser.id ? 'text-right' : 'text-left'
                                }`}
                        >
                            <div
                                className={`inline-block p-2 rounded-lg ${message.writerUserId === loggedInUser.id
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-black'
                                    }`}
                            >
                                <p>{message.messageContent}</p>
                                <small className="text-xs opacity-75">
                                    {message.shippingDate} {` By ${message.writerUserId === loggedInUser.id ? 'You' : message.writerUserId}`}
                                </small>
                            </div>
                            {message.writerUserId === loggedInUser.id && (
                                <Button variant="danger" onClick={() => handleDeleteMessage(message._id)}>
                                    <Trash className="w-4 h-4 mr-1" /> Delete
                                </Button>
                            )}
                        </div>
                    ))
                )}
            </ScrollArea>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 border-t">
                    <div className="flex space-x-2">
                        <FormField
                            control={form.control}
                            name="messageContent"
                            render={({ field }) => (
                                <FormItem className="flex-grow">
                                    <FormControl>
                                        <Input placeholder="Type a message..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Send</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default Chat;

