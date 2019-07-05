<template>
  <div class="comment">
    <p class="heading"><b>{{comment.name || 'Anonymous'}}</b></p>
    <p v-html="comment.comment"></p>
    <span>{{getCommentDate(comment.date)}}</span>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import {Comment} from '@/models/comment';
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({})
export default class CommentComponent extends Vue {
  @Prop() comment!: Comment;

  getCommentDate(date: number) {
    const currentTimestamp = moment(moment().format('YYYY MM DD') + ' 00:00:00').unix()
    return date < currentTimestamp ? moment.unix(date).format('MMM DD, YYYY') : moment.unix(date).fromNow()
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/flex-mixins/flex-styles";
@import "../sass/abstracts/mixins";

.comment {
  margin-top: 1.5em;
  @include fx-layout-with-gap(column, 5px);

  .heading {
    &::before {
      background: #767676;
      content: "\020";
      display: block;
      height: 2px;
      margin: 1rem 0;
      width: 1.5em;
    }
  }

  p {
    font-size: 1em;
  }

  span {
    font-size: 12px;
    font-style: italic;
    color: gray;
  }
}
</style>
