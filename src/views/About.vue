<template>
  <div class="about">
    <h2 class="about-heading">About the Author</h2>
    <p>
      Hey there, thanks for stopping by.<br><br>
      A Software Engineer by fault and a Poet by fate, who likes to spent 1/3rd of the day cuddling with laptop writing code.
      The most exciting part of my day has to be the one when I'm writing my thoughts in rhythm, I mean it is definitely something that turns me on.
      With Alternative Rock / Pop Rock music on Spotify, I like to tap the keys around and end up writing what people call Poems.
      In this world full of Ed Sheeran fans, I guess I'm still the Old School Goo Goo Dolls fan, who is yet to give up listening to Iris.<br><br>
      Not a bookworm, but I just love to read love stories and those fantasy fictional books. Not a lover, but I like to talk about love and how does it feels
      to end up spending your entire life with someone you love. Not a talkative brat, but I like to talk to strangers about what they think about life? Afterall <b>One IDEA can change your life</b>.<br><br>
      I'm a orthodox mess, if I were asked to brief myself, but I truly love the way I have been and I currently am.<br><br>
    </p>
    <h2>Why I started The Rhyming Reasons?</h2>
    <p>
      I have been extremely sluggish in expressing my thoughts, though things have started to change lately. But back then, things were terrible.
      I was afraid of being judged by others, since I had been carrying this orthodox mindset all the while.
      I'd just stack everything inside my head and it literally screwed me up. Highway to hell?<br><br>
      I have always been an avid reader, one fine day, I ended up reading a Poem which changed me inside out. I felt, it was so easy to vent out my thoughts this way.
      So, that's how I started writing poetry.<br><br>
      Initial days, it wasn't quite purposeful but then I started penning down more meaningful ones. One day, I was thinking about the name of my blog
      and I literally thought about everything but the reason why I wrote poems? I realized I wrote everything for a reason and thus I ended up naming my blog
      <b>The Rhyming Reasons</b>.
    </p>
    <h2 class="contact-heading">Want to Connect? Feel free to drop in and Say Hi !</h2>
    <p>Phone: +91 97182-82486</p>
    <a class="link" href="mailto:immanubhardwaj@gmail.com">Email: immanubhardwaj@gmail.com</a>
    <router-link class="router-link link" to="/">Back to Home</router-link>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'about'
}
</script>

<style lang="scss" scoped>
@import "../sass/flex-mixins/flex-styles.scss";
.about {
  @include fx-layout-with-gap(column, 20px);

  h2 {
    font-weight: 400;
    margin: 0 0.5em 0.5em 0;
  }

  .tagline {
    margin-top: 0;
  }

  .about-heading {
    margin-top: 1em;

    &::before {
      background: #767676;
      content: "\020";
      display: block;
      height: 2px;
      margin: 1rem 0;
      width: 1em;
    }
  }

  .contact-heading {
    margin: 1em 0;
  }

  .router-link {
    width: fit-content;
    margin-top: 2em;
  }
}
</style>
