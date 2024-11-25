# IH Movie List
A simple project to display a list of movies using a public API.

## Setup the project locally
Follow these steps to set up the project on your local machine:
1. Clone the repository
```
git clone https://github.com/day-lee/ih-movie-list.git
```

3. Install dependancy
```
cd ih-movie-list
npm install
```

4. Create an `.env` file
In the root of the project directory, create a file `.env`  
add the following variables 
```
VITE_API_KEY=<provided-api-key>
VITE_APP_AUTH_TOKEN=<provided-token>
```

6. Start the development server
```
npm run dev
```

## Additional Information
### Technologies Used:
- React (Vite)
- TypeScript
- Tailwind CSS
- Axios 

### Features:

- Displays a list of popular movies retrieved from The Movie Database (TMDB) API.
- Shows a movie details in a modal. 
- Allows searching, filtering, and sorting of movies.
- Responsive and acceesible design for mobile and desktop devices.

### Brief explanation of my apporach
- I used useReducer to manage the state, as it’s great for handling more complex state updates.
- I added loading and error handling, along with messages for better user experience
- I kept the code modular by splitting it into four components: Header, Main, FilterBox, and DetailModal.  
This makes the project easier to read, maintain, and update.
