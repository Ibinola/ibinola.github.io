---
title: 'How I built a discord bot'
description: 'Building a Discord Bot to deliver random quotes from The Office.'
pubDate: 'June 7, 2024'
draft: true
---

Nothing fancy, but I enjoyed building this, a bot that responds with a random quote from the tv show <i>The Office</i>

![Bot in Action](/bot-showing-quote.png)

### Creating a New Discord Application

The first step is to create a discord app. We can do this by going to the [discord developer portal](https://discord.com/developers/docs/quick-start/getting-started) and clicking on the `Create App`

![alt text](/public/create-app.png)

We’ll call our app `thatswhatshebot`. Next, we need to set up <i>a bot user, permissions and OAuth.</i>

### Bot User
Simply set this up by adding a username and icon.

![bot](/public/bot.png)

Click on "Reset Token" to get your token and save it somewhere safe. Also if you scroll down a bit, you'll find the “MESSAGE CONTENT INTENT” setting, enable it.

### Permissions
We need to ensure our app has all the correct permissions needed to function properly, you can adjust the permissions as needed based on additional functionalities your bot may require. For this, I used just two permissions:

![permissions](/public/permissions.png)

### OAuth & Permissions

Then head over to Oauth, can be found on the left side panel, and set scopes and permissions as so:

![scopes](/public/scopes.png)

The `bot` scope allows your bot to be invited to servers and the `applications.command` scope allows your bot to create and manage slash commands.

![permissions2](/public/permission2.png)

For permissions we want our bot to be able to read messages, send messages, and use the slash command. After setting all of these up, copy the generated URL from the bottom of the screen. Paste into your browser and grant your bot the necessary permissions, ideally in a private test server.

![generated_url](/public/generatedurl.png)

Once this is completed, we can start coding the bot!

## Writing the bot

We will use the `discord.py` package as an interface to Discord API and the `requests` library to send requests to <i>the Office</i> API.

Run the command in your terminal inside your directory to install the necessary packages:

```python
pip install discord requests python-dotenv
```  
The <i>dotenv</i> is used to access environment variables. Create a `.env` file to store your environment variables. The file will contain:

```python
TOKEN="MTEz....."
```
This token is the one we saved earlier, found in the Bot section on the side panel.

In `bot.py` or whichever name you choose for your starter file, we start by importing the necessary libraries and loading our `.env` file.

```python
import discord, os, requests, dotenv
from dotenv import load_dotenv
from discord.ext import commands

load_dotenv() # Load environment variable from .env file

token = os.getenv('TOKEN') # Retrieve the bot token from environment variables
```

### Setting Up Intents and Creating the Bot Instance

By default, discord has disabled most intents to improve performance and security, Intents limit what events your bot will receive, so we enable `message_content` intent so our bot can read the message. 

```python
intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(command_prefix='/', intents=intents)  # Create a bot instance with a command prefix '/'
```

### Fetching a Random Quote

Now we define a function that fetches and return a random quote from 'The Office' API

```python
def get_quotes():
    response = requests.get('https://officeapi.akashrajpurohit.com/quote/random')
    if response.status_code == 200:
        json_data = response.json()
        quote = json_data.get('quote')
        character = json_data.get('character')
        return (f" \"{quote}\" - {character}")
```

### Slash Commands and Events

We use the `@bot.hybrid_command` decorator to define a slash command named `quote` and `slash_command` a function that runs when the application starts.

```python

@bot.hybrid_command(name='quote', description='Sends a random quote from the office tv show')
async def slash_command(interaction: discord.Interaction):
    await interaction.send(get_quotes())
```

Lastly, we add the `on_ready` function that runs when the application starts.

```python
@bot.event
async def on_ready():
    await bot.tree.sync()
    print(f'Bot is live!')

bot.run(token)
```

And that's it! Run your app using the `python bot.py` command, and the bot will start up,

This is what the final code looks like:

```python
import discord, os, requests, dotenv
from dotenv import load_dotenv
from discord.ext import commands

load_dotenv()

token = os.getenv('TOKEN')

intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(command_prefix='/', intents=intents)

def get_quotes():
    response = requests.get('https://officeapi.akashrajpurohit.com/quote/random')
    if response.status_code == 200:
        json_data = response.json()
        quote = json_data.get('quote')
        character = json_data.get('character')
        return (f" \"{quote}\" - {character}")


@bot.hybrid_command(name='quote', description='Sends a random quote from the office tv show')
async def slash_command(interaction: discord.Interaction):
    await interaction.send(get_quotes())
    

@bot.event
async def on_ready():
    await bot.tree.sync()
    print(f'Bot is live!')

bot.run(token)
```

You can view the code for this project on my [Github](https://github.com/Ibinola)

