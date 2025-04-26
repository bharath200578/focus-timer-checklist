# Focus Timer

A feature-rich Pomodoro Timer application for tracking tasks, enhancing productivity, and visualizing work habits.

## Features

- **Pomodoro Timer**: Focus sessions, short breaks, and long breaks with customizable durations
- **Task Management**: Create, categorize, track, and complete tasks
- **Statistics**: View daily and weekly productivity metrics
- **User Accounts**: Sign up, sign in, and secure data with authentication
- **Data Synchronization**: All data is stored in Supabase for seamless access across devices

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: CSS
- **Backend**: Supabase for authentication and database
- **Charts**: Chart.js for visualization

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/focus-timer.git
   cd focus-timer
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a Supabase project:
   - Sign up at [supabase.com](https://supabase.com)
   - Create a new project
   - Get your Supabase URL and anon key

4. Create a `.env` file in the project root:
   ```
   REACT_APP_SUPABASE_URL=your-supabase-url
   REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

5. Set up the database schema (in Supabase SQL editor):
   ```sql
   -- Create tasks table
   CREATE TABLE tasks (
     id UUID PRIMARY KEY,
     user_id UUID REFERENCES auth.users NOT NULL,
     title TEXT NOT NULL,
     category TEXT NOT NULL,
     estimated_pomodoros INTEGER NOT NULL,
     completed_pomodoros INTEGER NOT NULL DEFAULT 0,
     completed BOOLEAN NOT NULL DEFAULT FALSE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     
     CONSTRAINT fk_user
       FOREIGN KEY(user_id)
       REFERENCES auth.users(id)
       ON DELETE CASCADE
   );

   -- Set up row-level security policies
   ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Users can view their own tasks"
     ON tasks FOR SELECT
     USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can insert their own tasks"
     ON tasks FOR INSERT
     WITH CHECK (auth.uid() = user_id);
   
   CREATE POLICY "Users can update their own tasks"
     ON tasks FOR UPDATE
     USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can delete their own tasks"
     ON tasks FOR DELETE
     USING (auth.uid() = user_id);
   
   -- Create sessions table
   CREATE TABLE sessions (
     id UUID PRIMARY KEY,
     user_id UUID REFERENCES auth.users NOT NULL,
     task_id UUID REFERENCES tasks(id),
     session_type TEXT NOT NULL,
     start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     end_time TIMESTAMP WITH TIME ZONE,
     duration INTEGER NOT NULL,
     
     CONSTRAINT fk_user
       FOREIGN KEY(user_id)
       REFERENCES auth.users(id)
       ON DELETE CASCADE,
     
     CONSTRAINT fk_task
       FOREIGN KEY(task_id)
       REFERENCES tasks(id)
       ON DELETE SET NULL
   );
   
   ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Users can view their own sessions"
     ON sessions FOR SELECT
     USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can insert their own sessions"
     ON sessions FOR INSERT
     WITH CHECK (auth.uid() = user_id);
   
   CREATE POLICY "Users can update their own sessions"
     ON sessions FOR UPDATE
     USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can delete their own sessions"
     ON sessions FOR DELETE
     USING (auth.uid() = user_id);
   ```

6. Start the development server:
   ```
   npm start
   ```

## License

MIT
