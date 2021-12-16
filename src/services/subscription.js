import Parse from "../config/server";
import { getEventById } from "./event";


// const getSubscriptionByEventId = async (eventId) => {
//     const subscription = new Parse.Object('EventSubscription');
//     const query = new Parse.Query(subscription);
//     query.equalTo('event', eventId);

//     try {
//         const result = await query.find();
//         return {
//             id:result.id,
//             subscribed:object.get('subscribed')
//         }
//     } catch (error) {
//         console.error('Error while fetching EventSubscription', error);
//     }
// }

const createEventSubscription = async () => {
    const subscription = new Parse.Object('EventSubscription');
    subscription.set('subscribed', []);
    
    try {
        const result = await subscription.save();
        console.log('EventSubscription created', result);
        return result;
    } catch (error) {
        console.error('Error while creating EventSubscription: ', error);
    }

}

const signSubscription = async (userId, subscriptionId, subscribed) => {
    try {
        const data = new Parse.Object('EventSubscription');
        data.set('objectId', subscriptionId)
        data.set('subscribed', [...subscribed,userId]);

        const result = await data.save();
        console.log('EventSubscription updated', result);
    } catch (error) {
        console.error('Error while updating EventSubscription: ', error);
    }
};

const unsignSubscription = async (userId, eventId, subscribed) => {
    try {
        const event=await getEventById(eventId);
        const list=event.subscribed;
        const updated=list.splice(list.indexOf(event.subscribed),1);

        const data = new Parse.Object('EventSubscription');
        data.set('objectId', event.subscriptionId)
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
    unsignSubscription
}
