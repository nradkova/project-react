import Parse from "../config/server";


const createEvent = async (data) => {
	try {
		// const ratingResult = await createeventRating();

		const event = new Parse.Object('Event');
		event.set('name', data.title);
		event.set('date', data.author);
		event.set('description', data.description);
		event.set('creator', Parse.User.current());
		event.set('location', data.location);
		event.set('imageUrl', data.image);
		event.set('status', "active");

		const result = await event.save();
		return result;
	} catch (error) {
		console.error('Error while creating event: ', error);
	}
}

const editEvent = async (eventId, data) => {
	const event = Parse.Object.extend('event');
	const query = new Parse.Query(event);

	try {
		const event = await query.get(eventId);
		event.set('title', data.title);
		event.set('author', data.author);
		event.set('description', data.description);
		event.set('creator', Parse.User.current());
		event.set('category', data.category);
		event.set('imageUrl', data.image);
		try {
			const result = await event.save();
			return result;
		} catch (error) {
			console.error('Error while updating event', error);
		}
	} catch (error) {
		console.error('Error while retrieving event', error);
	}
}

const cancelEvent = async (eventId) => {
	const event = Parse.Object.extend('event');

	const query = new Parse.Query(event);

	try {
		const event = await query.get(eventId);
		try {
			const response = await event.destroy();
			console.log('Deleted ParseObject', response);
		} catch (error) {
			console.error('Error while deleting ParseObject', error);
		}
	} catch (error) {
		console.error('Error while retrieving ParseObject', error);
	}
}

const getEventById = async function (eventId) {
	const event = Parse.Object.extend('event');

	const query = new Parse.Query(event);
	query.include('creator');
	query.include('eventRating');
	query.equalTo('objectId', eventId);

	try {
		const data = await query.first();
		const result = viewModel(data);
		return result;
	} catch (error) {
		console.error('Error while fetching event', error);
	}
}

const getAllevents = async function (pagination) {
	const event = Parse.Object.extend('event');

	const query = new Parse.Query(event);
	query.include('creator');
	query.include('eventRating');
	query.descending('createdAt');
	query.skip((pagination.counter-1)*pagination.perPage).limit(pagination.perPage);

	try {
		const data = await query.find();
		const results = data.map(viewModel);
		return results;
	} catch (error) {
		console.error('Error while fetching event', error);
	}
}

const getAlleventsCount = async function () {
	const event = Parse.Object.extend('event');

	const query = new Parse.Query(event);
	try {
		return await query.count();
	} catch (error) {
		console.error('Error while fetching event', error);
	}
}

const geteventsByAuthor = async function (pagination,search) {
	const event = Parse.Object.extend('event');

	const query = new Parse.Query(event);
	query.include('creator');
	query.include('eventRating');
	query.matches('author', search, 'i');
	query.skip((pagination.counter-1)*pagination.perPage).limit(pagination.perPage);

	try {
		const data = await query.find();
		const results = data.map(viewModel);
		return results;
	} catch (error) {
		console.error('Error while fetching event', error);
	}
}

const geteventsByAuthorCount = async function (search) {
	const event = Parse.Object.extend('event');

	const query = new Parse.Query(event);
	query.matches('author', search, 'i');

	try {
		return await query.count();
	} catch (error) {
		console.error('Error while fetching event', error);
	}
}

const geteventsByTitle = async function (pagination ,search) {
	const event = Parse.Object.extend('event');

	const query = new Parse.Query(event);
	query.include('creator');
	query.include('eventRating');
	query.matches('title', search, 'i');
	query.skip((pagination.counter-1)*pagination.perPage).limit(pagination.perPage);

	try {
		const data = await query.find();
		const results = data.map(viewModel);
		return results;
	} catch (error) {
		console.error('Error while fetching event', error);
	}
}

const geteventsByTitleCount = async function (search) {
	const event = Parse.Object.extend('event');

	const query = new Parse.Query(event);
	query.matches('title', search, 'i');

	try {
		return await query.count();
	} catch (error) {
		console.error('Error while fetching event', error);
	}
}


const geteventsByCategory = async function (pagination,search) {
	const event = Parse.Object.extend('event');

	const query = new Parse.Query(event);
	query.include('creator');
	query.include('eventRating');
	query.equalTo('category', search);
	query.skip((pagination.counter-1)*pagination.perPage).limit(pagination.perPage);

	try {
		const data = await query.find();
		const results = data.map(viewModel);
		return results;
	} catch (error) {
		console.error('Error while fetching event', error);
	}
}

const geteventsByCategoryCount = async function (search) {
	const event = Parse.Object.extend('event');

	const query = new Parse.Query(event);
	query.equalTo('category', search);

	try {
		return await query.count();
	} catch (error) {
		console.error('Error while fetching event', error);
	}
}

const geteventsByCreator = async function (pagination,search) {
	const innerQuery = new Parse.Query('User');
	innerQuery.equalTo('username', search.toLocaleLowerCase());

	const query = new Parse.Query('event');
	query.include('creator');
	query.include('eventRating');
	query.matchesQuery('creator', innerQuery);
	query.skip((pagination.counter-1)*pagination.perPage).limit(pagination.perPage);

	try {
		const data = await query.find();
		const results = data.map(viewModel);
		return results;
	} catch (error) {
		console.error('Error while fetching event', error);
	}
}

const geteventsByCreatorCount = async function (search) {
	const innerQuery = new Parse.Query('User');
	innerQuery.equalTo('username', search.toLocaleLowerCase());

	const query = new Parse.Query('event');
	query.include('creator');
	query.matchesQuery('creator', innerQuery);

	try {
		return await query.count();
	} catch (error) {
		console.error('Error while fetching event', error);
	}
}


const getLastFourevents = async function () {
	const event = Parse.Object.extend('event');

	const query = new Parse.Query(event);
	query.include('creator');
	query.include('eventRating');
	query.descending('createdAt').limit(4);

	try {
		const data = await query.find();
		const results = data.map(viewModel)
		return results;
	} catch (error) {
		console.error('Error while fetching event', error);
	}
}

const getMostLikedevents = async function () {
	const eventRating = Parse.Object.extend('eventRating');
	const innerQuery = new Parse.Query(eventRating);
	innerQuery.equalTo('star', 5);

	const event = Parse.Object.extend('event');
	const query = new Parse.Query(event);
	query.include('creator');
	query.include('eventRating');
	query.matchesQuery('eventRating', innerQuery);
	query.descending('createdAt');
	query.limit(4);

	try {
		const data = await query.find();
		console.log(data);
		const results = data.map(viewModel);
		return results;
	} catch (error) {
		console.error('Error while fetching event', error);
	}
}

const viewModel = (record) => {
	const creator = record.get('creator').get('username');
	const eventRatingId = record.get('eventRating').id;
	const rating = record.get('eventRating').get('star');
	const voted = record.get('eventRating').get('voted');
	const date = new Date(record.createdAt)
		.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })

	return {
		id: record.id,
		createdAt: date,
		title: record.get('title'),
		author: record.get('author'),
		description: record.get('description'),
		imageUrl: record.get('imageUrl'),
		category: record.get('category'),
		voted,
		rating,
		creator,
		eventRatingId
	}
}

export {
	createEvent,
	editEvent,
	cancelEvent,
	getEventById,
}
