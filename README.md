# 🐾 Pet Care Tracker 🐾

* Team member: Yiduo Jing [1000308142], yiduo.jing@mail.utoronto.ca

### Premise
For the best experience, please use Google Chrome, as some browsers may not fully support Tailwind CSS and shadcn/ui components. I used emojis somewhere, and I assume most system fonts support them.

### Video Demo
See the video demo.mp4 located in the assets folder or go to the shared link [demo.mp4](https://drive.google.com/file/d/1NZlcwXaJVb-Wsj4p23hBZTV_h9Xup7Ci/view?usp=sharing).

### Motivation:
As a cat owner and journaling enthusiast, I've struggled to find an app that combines pet care tracking with a personal journaling experience. Most apps focus on health records, lacking a simple way to document pet's daily routines, e.g. grooming, feeding, activities, etc. I want to create a timeline-style journal to easily log pet's routines and milestones while keeping it private and uncomplicated. This project merges my passions for journaling and pet care. The target users are pet owners who enjoy journaling and want a straightforward way to record their pet's daily moments in an organized format.

### Objectives:
This project aims to build a Pet Care Tracker app tailored for cat owners, enabling them to record daily activities and important moments, such as grooming, feeding, and vet visits in a timeline format. Along the way, I aimed to gain hands-on experience with technologies like React, Next.js, Tailwind CSS, shadcn/ui, etc., through practical implementation.
### Technical Stack:
The app was built using the **Next.js Full Stack** framework to ensure responsiveness, with **Tailwind CSS** and **shadcn/ui** powering the user interface. **PostgreSQL** was used as the database, managed through **Prisma ORM** with deployed version hosted on **Supabase**. For file storage, the app integrated **DigitalOcean Spaces**, and **NextAuth** handled user authentication. I primarily used the **sonner toast** to display messages.
### Features:
1. **User Authentication & Authorization:**
   - **Feature:** Secure user login and session management. The session expiration date is set to 30 days by default. Although the database option is available, it is not allowed. Hence, the current session type is JWT. The middleware ensures that only users with an active session can access the dashboard and pet-related pages. Otherwise, they will be redirected to the login page.
   - **Technical Approach:** I initially planned to use BetterAuth, but ran into persistent issues with session management. Despite seeking help through available resources, including the BetterAuth Discord community, the lack of documentation made troubleshooting difficult. Due to time constraints, I decided to switch to NextAuth. However, this also came with challenges, particularly inconsistencies between the local and production builds (deployed on Vercel). After considerable debugging, I managed to resolve the issue, though I'm still not entirely confident in its stability. Hopefully, it continues to work as expected.

2. **Pet Management (Add/Edit/Delete Pet & Pet Profile):**
   - **Feature:** Users can add multiple pets, each with an optional profile picture, name, and birthdate.
   - **Technical Approach:** Implemented Next.js Server Actions to handle the creation, editing, and deletion of pet profiles. *(Please refer to the user guide for more details.)*
  
3. **Daily Journey Timeline Log:**
   - **Feature:** Each pet has a vertical timeline where users can add, edit and delete daily logs categorized by tags such as grooming, playtime, feeding, and vet visits. The timeline presents logs in chronological order, starting from an earlier date and going to a later one. The log page will default display logs for the past 7 days, including today. A **Load Earlier Dates** button is on the top to fetch and display more logs. Currently, reloading the page doesn't preserve the loaded logs, but I plan to enhance this by using session storage in the future. *(Please refer to the user guide for more details.)*
   - **Technical Approach:** Designed a Log model in Prisma, associating each log entry with a specific pet and user (with session-based access control). Each log contains a description, date, and tag. The logs are displayed in a timeline format, using Card, Textarea, and Badge components from shadcn/ui, with styling handled by Tailwind CSS.
   - Schema for Log: 
        ```
        model Log {
        id          String   @id @default(uuid())
        description String
        date        DateTime @default(now()) // Date the log was created
        tag         String
        images      String[]
        userId      String
        user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
        petId       String
        pet         Pet      @relation(fields: [petId], references: [id], onDelete: Cascade)
        createdAt   DateTime @default(now())
        updatedAt   DateTime @updatedAt

        @@index([petId, date])
        }
        ```

4. **Pet Switching:**
   - **Feature:** Users can switch between pets to view and add logs for specific pets.
   - **Technical Approach:** Leveraged Next.js dynamic routing to navigate to the selected pet's page using its ID and display the corresponding pet-specific content.

5. **File Handling (Pet Profile Pictures):**
   - **Feature:** Users can upload pet profile pictures in a modal.
   - **Technical Approach:** Integrated DigitalOcean Spaces for secure file storage, using its API within the Next.js framework to handle image uploads. This allows users to upload and display images on their pet's profile.

6. **Responsiveness**
   - Utilized the Tailwind CSS along with different shadcn/ui components based on the screen size, e.g. for switching pets, you will see a selection sidebar versus a simple dropdown between different screens
   - Used **sonner toast** for better mobile loading, message notification effect
  
This project met the advanced feature requirements for **User Authentication and Authorization** and **File Handling and Processing**. Core features such as pet management and log management are finished on time, fulfilling the core technical requirement of using **Next.js Full-Stack** architecture with **PostgreSQL (Prisma ORM managed)** for relational database and **DigitalOcean Spaces** for file handling.  

### User Guide:
All the pages are responsive design. You can check more images under the **assets** folder.
- **Homepage**: `baseURL`

  This is an attractive (maybe not) homepage. Clicking on **Get Started** will redirect to the sign-up page if no session is available. If a session is available, it will redirect to the dashboard.
  ![Homepage-big](https://raw.githubusercontent.com/gyuujiru1212112/pet-care-tracker/refs/heads/main/assets/homepage-big.png)
- **Signup**: `baseURL/signup`

  You need to enter an email address and a password to register a new user.    
  - After successful sign-up, the page **redirects to the sign-in page**. Be cautious! I don't redirect you to the dashboard but to the sign-in page.
  - You should see a toast message telling you the error.

  ![Signup-big](https://raw.githubusercontent.com/gyuujiru1212112/pet-care-tracker/refs/heads/main/assets/signup-big.png)

- **Signin**: `baseURL/login`

  You need to enter the email address and password of a user you created before signing in.
    - After successful sign-in, the page **redirects to the dashboard page**. This takes a bit of time. Be patient!
    - You should see a toast message telling you the error.
  
  ![Signin-big](https://raw.githubusercontent.com/gyuujiru1212112/pet-care-tracker/refs/heads/main/assets/signin-big.png)


- **Signout**:

  A button on the right corner of the headbar. Clicking on it to sign out. See the image below.
- **Home**: 🏠:
  
  A button on the left corner of the headbar. Clicking on it will **redirect to the dashboard page**. See the image below.
  ![Headbar](https://raw.githubusercontent.com/gyuujiru1212112/pet-care-tracker/refs/heads/main/assets/headbar.png)
- **Dashboard**: `baseURL/dashboard`

  A board shows all the pets added, including their profile images, names, and birthdates.
    ![Dashboard](https://raw.githubusercontent.com/gyuujiru1212112/pet-care-tracker/refs/heads/main/assets/dashboard-big.png)
- **Pet Profile Card**:
  
  On the dashboard, each pet has a card-style profile. You can create a pet by clicking the **Add Pet** button.
  - Add pet: `baseURL/pets/new`
  
    Clicking on the **Add Pet** button will redirect you to a blank pet form page.
    ![Add-pet](https://raw.githubusercontent.com/gyuujiru1212112/pet-care-tracker/refs/heads/main/assets/add-pet-big.png)
  - Edit pet:`baseURL/pets/[id]/edit`
  
    Clicking on the **Pencil** button on the profile card will redirect you to a pet form page filled with the selected pet information.
    ![pet-edit-button](https://raw.githubusercontent.com/gyuujiru1212112/pet-care-tracker/refs/heads/main/assets/pet-edit-button.png)
    ![edit-pet-big](https://raw.githubusercontent.com/gyuujiru1212112/pet-care-tracker/refs/heads/main/assets/edit-pet-big.png)
  - Delete pet: Clicking on the **Trash Bin** button on the profile card will prompt an alert dialogue asking you to confirm whether you want to delete the pet. If yes, the pet profile and its logs will be deleted permanently. If not, nothing will be changed.
  ![pet-delete-button](https://raw.githubusercontent.com/gyuujiru1212112/pet-care-tracker/refs/heads/main/assets/pet-delete-button.png)
![delete-pet-alert](https://raw.githubusercontent.com/gyuujiru1212112/pet-care-tracker/refs/heads/main/assets/delete-pet-alert.png)
  - Pet form:
  You can enter or edit the basic information for pets and upload a profile image in a modal.
    - File not chosen
    ![upload-modal](https://raw.githubusercontent.com/gyuujiru1212112/pet-care-tracker/refs/heads/main/assets/profileimageUpload.png)
     - File chosen; an image preview is avaiable.
    ![upload-preview](https://raw.githubusercontent.com/gyuujiru1212112/pet-care-tracker/refs/heads/main/assets/image-preview-after-select-file.png)

- **Log screen**: `baseURL/pets/[id]/log`

  Clicking on a particular pet profile card ("Tap to View" is a hint for mobile users to tap; For desktop users, you should notice a hover effect) will redirect to the log page of the selected pet. The log page will default display logs for the past 7 days, including today. Scroll up or down to see all of them.
  ![log-page](https://raw.githubusercontent.com/gyuujiru1212112/pet-care-tracker/refs/heads/main/assets/logpage.png)
  - Add log:
  
    Click on the **Add Log** button beside a date to open a log form under that date. Click on **Cancel** to close the log form without making changes. Enter any input, select a specific tag related to your log and click **Add Log** to add a new log. The successfully added log will be shown immediately afterwards.
    ![add-log](https://raw.githubusercontent.com/gyuujiru1212112/pet-care-tracker/refs/heads/main/assets/add-log-form.png)
  - Edit log:
  
    Similarly, click on the **Pencil** button on the top right corner of an existing log to change it to a log form. Click on **Cancel** to close the log form without making changes. Click **Edit Log** to edit the log. The successfully edited log will be updated immediately afterwards.
    ![edit-log](https://raw.githubusercontent.com/gyuujiru1212112/pet-care-tracker/refs/heads/main/assets/edit-log-form.png)
  - Delete log:
  
    Clicking on the **Trash Bin** button on the top right corner of an existing log will prompt an alert dialogue asking you to confirm whether you want to delete the log. If yes, the log will be deleted permanently. If not, nothing will be changed.
    ![delete-log](https://raw.githubusercontent.com/gyuujiru1212112/pet-care-tracker/refs/heads/main/assets/delete-log-alert.png)
  - Load Earlier Date:
  
    Click on the **Load Earlier Dates** button to view logs from two additional earlier days. The loaded logs are not preserved after reloading.
  - Switch pets:
    - Desktop:
  
      There is a sidebar on the left side of the page for users to switch pets. The icon on the top is the currently selected pet. Click on one of the pet icons below **Select a pet to switch** to switch to the log page of the chosen pet.
      
      ![pet-selection-log-page](https://raw.githubusercontent.com/gyuujiru1212112/pet-care-tracker/refs/heads/main/assets/petselection.png)

    - Mobile or smaller screen:
  
      Instead of a sidebar, a drop-down menu below the selected pet icon allows users to switch pets. Click on one of the pet names in the drop-down menu to switch to the chosen pet's log page.
      ![pet-dropdown-log-page](https://raw.githubusercontent.com/gyuujiru1212112/pet-care-tracker/refs/heads/main/assets/petdropdown.png)


### Development Guide:
#### Deployed Version (Highly Recommended)
Access the live app at https://pet-log-gilt.vercel.app/. For more details about the platform, refer to the **Deployment** section.
If your sign-up/sign-in is unsuccessful, here is a registered account for you to log in: email: yd_jing@hotmail.com, password: nichi121.

#### Local environment:
- **Environment setup and configuration**:
  - Run `npm install next` if it complains `sh: next: command not found`
- **Database initialization**:
  - The deployed version now uses a Supabase-hosted database. To keep local and production data separate, please use a local PostgreSQL instance when running the app in your local environment.
  - For using a local PostgreSQL server, follow these steps:
    1.	Start the PostgreSQL server on your local machine `brew services start postgresql` and create a PostgreSQL database `createdb db_name`.
	  2.	Set the DATABASE_URL in your .env file to point to your local database as below:
    - **Be sure to include the DIRECT_URL** as well in your configuration, even though it's intended for the remote database server, it's still required to be explicitly specified.
      ```
      DATABASE_URL="postgresql://[username]:[randompassword]@localhost:[port]/[db_name]?schema=public"
      DIRECT_URL="postgresql://[username]:[randompassword]@localhost:[port]/[db_name]?schema=public"
      ```
	3.	Run `npx prisma generate`
	4.	Run `npx prisma migrate dev --name init` to apply the initial migration and set up the database schema.
- **Cloud storage configuration**:
  Add the following lines to your **.env** file
  ```
  SPACES_KEY=DO801DYY3G28JPBAE49R
  SPACES_SECRET=FFNnBzEGbNFzADs6IulEkOVvvHPJ/Jq85iljzG6i4/M
  SPACES_REGION=nyc3
  SPACES_BUCKET=pet-care-tracker-next-images
  SPACES_ENDPOINT=https://nyc3.digitaloceanspaces.com
  ```
- **NextAuth configuration**:
  Add the following lines to your **.env** or **.env.local** file (I tested both locations and they work, but the official documentation recommends using **.env.local**.)
    ```
    NEXTAUTH_SECRET="6Do2bnYc0vZu9jMxjfgnpDLDiik+IcbLJ980WG26cow="
    NEXTAUTH_URL=http://localhost:3000
    ```
- **Local development**:
  - Development build: Run `npm run dev` (**Only development mode is supported because NextAuth requires a trusted host.**)
  - Open `http://localhost:3000` with your browser to view the homepage.



### Deployment Information (if applicable):
- Live URL: https://pet-log-gilt.vercel.app/
- Platform details: The app is deployed using [Vercel](https://vercel.com/), a cloud platform optimized for front-end frameworks and serverless functions. Vercel automatically builds and deploys the app directly from the connected Git repository. The environment variables used in production are mostly the same as the local setup, with the main difference being the database URL, which points to a Supabase-hosted PostgreSQL instance for the deployed version.
  ```
  # Connect to Supabase via connection pooling
  DATABASE_URL="postgresql://postgres.tedtmmupdskppyxrafoj:PetCareTracker@aws-0-ca-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

  # Direct connection to the database. Used for migrations
  DIRECT_URL="postgresql://postgres.tedtmmupdskppyxrafoj:PetCareTracker@aws-0-ca-central-1.pooler.supabase.com:5432/postgres"
  ```
 
### Individual Contributions:
I completed this project independently. I handled all aspects, including design, development, and testing.
### Lessons Learned and Concluding Remarks:
This project has been beneficial in solidifying my knowledge of Next.js full-stack development, particularly with Server and Client components. However, I still find it challenging to work with client components that involve server actions. Sometimes, I get confused about the distinction between server and client in Next.js, which can be especially frustrating when using NextAuth. Additionally, I haven't made significant contributions to performance optimization. Front-end development, especially when adjusting Tailwind CSS, also remains a tough challenge for me. Moreover, I explored several ways to add a loading effect, but I felt it added too much overhead. Overall, I enjoyed this course and creating this project!