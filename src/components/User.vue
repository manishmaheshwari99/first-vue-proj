<template>
  <tr :class="{'clicked': isDisabled}">
    <td>{{ post.id }}</td>
    <template v-if="!searchText">
      <td>{{ post.title }}</td>
      <td>{{ post.description }}</td>
      <td>{{ post.role }}</td>
    </template>
    <template v-if="searchText">
      <td v-html="searchedRow(post.title)"></td>
      <td v-html="searchedRow(post.description)"></td>
      <td v-html="searchedRow(post.role)"></td>
    </template>

    <td>
      <div class="buttons">
        <button
          :disabled="isDisabled"
          class="btn btn-edit"
          @click="editPost(index)"
        >
          Edit
        </button>
        <button class="btn btn-danger" @click="deletePost(post.id)">
          Delete
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      isDisabled: false,
    };
  },
  props: {
    post: Object,
    index: Number,
    searchText: String,
  },
  methods: {
    editPost(index) {
      this.isDisabled = true;
      this.$emit("editPost", index, this.onComplete);
    },
    async deletePost(id) {
      this.isDisabled = true;

      this.$emit("deletePost", id, this.onComplete);
    },
    onComplete() {
      this.isDisabled = false;
    },
    searchedRow(item) {
      const searchText = this.searchText;
      const index = item.indexOf(searchText);
      let string = item;
      if (index >= 0) {
        string =
          "<span class='search-text'>" +
          string.substring(0, index) +
          "<span style='background-color:#04aa6d' class='search-highlight'>" +
          string.substring(index, index + searchText.length) +
          "</span>" +
          string.substring(index + searchText.length) +
          "</span>";
      }
      return string;
    },
  },
};
</script>

<style scoped>
.clicked {
  opacity: 0.7;
}
</style>