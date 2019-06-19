# Plura
A todolist tool

# Plura: RFC

This is an RFC (request for comments) for a to-do-list application internally named Plura (latin for “more”). Plura will be the first to-do-list tool that schedules your day for you. Everyone is working on different projects in their life and wants to make time to do more. Yet we are often faced with free time during which we have no idea what to work on. I personally struggle with this issue often. The goal of Plura is to let the user input their goals or tasks and let the application handle the planning. 

# Projects
The term project here is used in place of “task” but in essence they are the same thing.

For example, I could tell Plura that I want to work on a programming assignment and it will take me approximately 5 hours to complete. Plura can then go ahead and schedule time slots in the coming days that will allow me to complete my project in time for the specified deadline. 

Larger projects could also be handled, with sub-projects/sub-tasks of their own.

# Roadblocks

Sometimes progress on a project is waiting on action from a third-party. In these situations we tend to have to keep it in our memory to keep checking if the task has been “unblocked”

Examples:

My boss Susy wants a summary of the earnings report, but I am still waiting on Bob from the financial team to finish up the earnings report and publish it onto the company database. In this situation I have to wait for Bob to finish and I know he will not be courteous enough to notify me when he has completed it. The only other option is for me to repeatedly remind myself to check the company database until the earnings report shows up. Plura can come in handy here, it can show you what roadblocks a certain task is waiting upon and remind you to check on them.
I have an assignment due next month but the professor has not yet released it on his website. Once again, unless I have the luxury of being notified that the assignment was released I would have to start checking the professors website a few weeks prior to the due date to see if the assignment has been made available.

Waiting on others is a common experience in collaborative work environments. We shouldn’t need to occupy mental space to remember to check roadblocks on our projects. Plura can help users identify these waiting moments, add them to a project, and remind users before the deadline to see if a roadblock has been cleared. Perhaps in some cases a roadblock appears after the user began work on the project, once again Plura will have the flexibility of letting the user add the roadblock in and shelf the project until the roadblock has been cleared. In fact, roadblocks are in principle projects of their own, and not very different in nature from a sub-project/sub-task. A project may also have multiple roadblocks and when all of these roadblocks are complete one can say a project is unblocked.
Dynamic Scheduling

Plura will support the ability to “push back” a deadline, or even the work-time allocated to a project. Suppose I initially predicted it will take me 5 hours to complete a certain project. When I realize it will require another 4 hours to complete this project, I can tell Plura to extend the predicted time. Plura can then schedule more time into my schedule for this project. I can also push back task deadlines, or set them as arbitrary (a.k.a. Not urgent and should get done whenever I have free time otherwise). 

Plura will also support a real time mutation of a day’s schedule. Suppose I initially planned on reading for 1 hour today, whilst reading I really began enjoying my book and wish to read for another hour. I can tell Plura to extend my reading time for the day and it will move around the rest of my schedule to compensate. 

# Lists

There are some facets of life where we have to do a task which is the same when defined on a macro level but different on a micro level. Watching TV, reading a book are the same day to day when defined on a macro level. But on a micro level, I can say I watched one show on one day and watched another show on another day and these are as defined, different activities. Plura will handle dynamic lists such that the user can feed a list for a task and Plura can handle working through the list to make sure everything gets done. The user specifies how much time needs to be allocated for each list item and Plura will move onto the next item on the list once X hours have been completed for the current item.

Some examples:

I have been aggregating a list of articles that I want to read, I can feed Plura the list and say that each individual article will take me 20 minutes on average (if I wanted to get specific, I might specify a unique read time for each article). Plura can then go ahead and schedule the articles such that I am told to read a new article each day. 
A similar example to the one above. Perhaps there is a list of TV shows that I want to watch during my entertainment time. (Or a list of movies). If I tell Plura the total amount of time it will take to watch each show or movie, Plura can reserve watching time for each episode and will automatically move onto the next once one show is completed. Alternatively I can tell Plura that I have completed a show (or don’t wish to continue watching) and it will move onto the next one
Lists extend beyond entertainment time. Perhaps I have a list of clients that I need to catch up with every year. I can set the list to repeat every year, and specify that each client will take 2 hours to catch up with, (as I have to physically meet with them). Plura can schedule these meetings for me such that I get through my list of clients once a year.

Generally with productivity tools I have seen that the users are much more creative at finding use cases than the developers. I am certain that a powerful feature like this list-based scheduling will have plenty of use cases for individuals across industries.

# Routine

Ideally Plura serves to provide order in a world of chaos. A real simple way we humans deal with the chaos in this world is by having daily routines. Plura wants to be a part of that. A user can tell Plura that they want to sleep 8 hours every night, wake up at 8 am daily, will be spending an hour commuting to and from work, and wish to workout for an hour every day. A user can also allocate the amount of “free time” during which Plura is allowed to schedule your projects. If I have a 9-5 job and I am using Plura to help me manage my side business and my work. I can tell Plura that it can only schedule projects categorized under “work” during the hours of 9am-5pm and it can only schedule projects categorized under “side business” during the hours of 8pm-11pm. This opens up the freedom for the user to control the macro level planning of their day while Plura handles the micro level.

# Events
This one seems obvious but its just worth mentioning that users can define events during which Plura can not schedule tasks as it is reserved for the event. Assuming there is Google calendar integration, this would work even more seamlessly as Plura would just see the time as blocked off by Google Calendar.

# Nightly Review
Ideally a user should be able to open up Plura before going to sleep and view/export the schedule for the next day, the user can then adjust the schedule (changing the order of events, allocating more time for those events, etc.). Ideally these events will be synced on Google Calendar and available in all platforms where Google Calendar is supported.

# Platform Support
The initial plan is to make Plura for web (mostly because that is where I see myself using this product the most). Support for a native Android App (or maybe React Native for cross platform) will come later with the MVP app only showing the user their daily agenda, next days agenda and basic adjustments to their next day. 


[Original RFC](https://docs.google.com/document/d/1Jv01EC-O7y4wAlv88nvwhOS4OygPnZQq3sNjw7IW7AI/edit?usp=sharing)
