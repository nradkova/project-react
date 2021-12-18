import Parse from "../config/server";
import { getEventById } from "./event";


const getSubscriptionByEventId = async (eventId) => {
    const subscription = new Parse.Object('EventSubscription');
    const query = new Parse.Query(subscription);
    query.equalTo('event', eventId);

    try {
        const result = await query.find();
        return {
            id: result.id,
            subscribed: result.get('subscribed')
        }
    } catch (error) {
        console.error('Error while fetching EventSubscription', error);
    }
}

const createEventSubscription = async (eventId) => {
    const subscription = new Parse.Object('EventSubscription');
    subscription.set('subscribed', []);
    subscription.set('event', eventId);

    try {
        const result = await subscription.save();
        console.log('EventSubscription created', result);
        return result;
    } catch (error) {
        console.error('Error while creating EventSubscription: ', error);
    }

}

const signSubscription = async (userId, subscriptionId, subscribed) => {
    const subscription = new Parse.Object('EventSubscription');
    const query = new Parse.Query(subscription);

    try {
        const data = await query.get(subscriptionId);
        data.set('subscribed', [...subscribed, userId]);

        try {
            const result = await data.save();
            console.log('EventSubscription updated', result);
        } catch (error) {
            console.error('Error while updating EventSubscription', error);
        }
    } catch (error) {
        console.error('Error while retrieving object EventSubscription', error);
    }
}

const unsignSubscription = async (userId, eventId) => {
    try {
        const event = await getEventById(eventId);
        const list = event.subscribed;
        const updated = list.splice(list.indexOf(userId), 1);

        const subscription = new Parse.Object('EventSubscription');
        const query = new Parse.Query(subscription);

        const data = await query.get(event.subscriptionId);
        data.set('subscribed', updated);

        const result = await data.save();
        console.log('EventSubscription updated', result);
    } catch (error) {
        console.error('Error while updating EventSubscription: ', error);
    }
};



export {
    signSubscription,
    createEventSubscription,
    unsignSubscription,
    getSubscriptionByEventId
}
