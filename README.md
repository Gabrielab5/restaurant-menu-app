Restaurant Menu Application

This project is a single-page web application built with Vue.js, utilizing Tailwind CSS for styling and Vuex for state management. The application displays a restaurant menu, allows users to add or remove items from a cart, and suggests meals based on user preferences.

Features
1. Menu Display: Organizes menu items by categories such as Appetizers, Mains, and Desserts. Each item includes a title, description, price, image, and tags (e.g., Gluten Free).

2. Cart Functionality: Enables users to add items to a cart, adjust quantities, and remove items. Displays the current total price of the cart.

3. Meal Suggestion:
   -Provides an input field where users can describe their dietary restrictions, preferences, spice tolerance, etc.
   -Generates a suggested meal based on the input (can range from basic keyword matching to more advanced suggestions).

Prerequisites
Ensure you have the following installed:
Node.js (version 14 or above)
npm (version 6 or above)

Project Setup
1. Install Dependencies

npm install

2. Run the Development Server

npm run serve

3. Build for Production

npm run build

4. Lint and Fix Files

npm run lint

5. Customize Configuration
For configuration options, refer to the Vue CLI Configuration Reference.

Usage Instructions
1.View Menu: The menu will be displayed in an organized layout with various categories.
2.Add Items to Cart: Click on the "Add to Cart" button next to each menu item.
3.Modify Cart: Users can view the cart, remove items, or adjust quantities.
4.Suggested Meal (Optional): Enter dietary preferences or restrictions in the input field to receive a suggested meal.

