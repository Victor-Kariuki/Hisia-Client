<template>
  <div class="columns">
    <div class="column">
      <form @submit.prevent="validateBeforeSubmit">
        <b-field>
          <b-input placeholder="Search..." v-model="search.hashtag" name="hashtag" type="search"
            icon="magnify" v-validate="'required|min:3'">
          </b-input>
          <button type="submit"
            :class="{'button':true, 'is-primary':true, 'is-loading': loading}">Search</button>
        </b-field>
      </form>
      <b-table :data="isEmpty ? [] : tweets" ref="table" paginated per-page="5" hoverable detailed
        :show-detail-icon="true" detail-key="name">
        <template slot-scope="props">
          <b-table-column field="name" label="Name">
            {{ props.row.name }}
          </b-table-column>
          <b-table-column field="location" label="Location">
            {{ props.row.location }}
          </b-table-column>
          <b-table-column field="retweets" label="Retweets">
            {{ props.row.retweets }}
          </b-table-column>
          <b-table-column field="likes" label="Likes">
            {{ props.row.likes }}
          </b-table-column>
          <b-table-column field="polarity" label="Polarity">
            <span :class="[
                      'tag',
                      {'is-danger': props.row.polarity < 0},
                      {'is-success': props.row.polarity > 0},
                      {'is-primary': props.row.polarity == 0}
                  ]">
              {{ props.row.polarity }}
            </span>
          </b-table-column>
        </template>
        <template slot="detail" slot-scope="props">
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img :src="props.row.image" alt="">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ props.row.name }}</strong>
                  <br>
                  {{ props.row.body }}
                </p>
              </div>
            </div>
          </article>
        </template>
        <template slot="empty">
          <section class="section">
            <div class="content">
              <figure class="image is-128x128">
                <img src="../assets/images/no_data.svg" alt="">
              </figure>
            </div>
          </section>
        </template>
      </b-table>
    </div>
    <div class="column">
      <h1 class="title">Sentiment Analysis Report</h1>
      <hr>
      <section>
        <template v-if="tweets.length == 0">
          <div class="columns is-centered">
            <div class="column is-half">
              <figure class="image is-4by3">
                <img src="../assets/images/no_data.svg" alt="">
              </figure>
              <h3 class="has-text-centered">No Data Avaliable</h3>
            </div>
          </div>
        </template>
        <template v-else>
          <b-tabs type="is-boxed">
            <b-tab-item label="Trend Analysis">
              <span class="tag is-success">Polarites trend analysis</span>
              <trend :data="polarites" :gradient="['#6fa8dc', '#42b983', '#2c3e50']" auto-draw
                smooth>
              </trend>
              <span class="tag is-success">Retweets trend analysis</span>
              <trend :data="retweets" :gradient="['#6fa8dc', '#42b983', '#2c3e50']" auto-draw
                smooth>
              </trend>
              <span class="tag is-success">Likes trend analysis</span>
              <trend :data="likes" :gradient="['#6fa8dc', '#42b983', '#2c3e50']" auto-draw smooth>
              </trend>
            </b-tab-item>
            <b-tab-item label="Pie Chart">
              <pie-chart :data="[['Positive', positiveTweets+'%' ],
                        ['Negative', negativeTweets+'%' ],
                        ['Neutral', neutralTweets+'%' ]
                      ]" :colors="['#6fa8dc', '#42b983', '#2c3e50']" :donut="true"
                :download="true">
              </pie-chart>
            </b-tab-item>
            <b-tab-item label="Geo Chart">
              <span class="tag is-success">Polarites trend across the world</span>
              <hr>
              <geo-chart :data="geoData" adapter="google"
                :colors="['#6fa8dc', '#42b983', '#2c3e50']" :download="true">
              </geo-chart>
            </b-tab-item>
            <b-tab-item label="Area Chart">
              <span class="tag is-success">Polarites vs retweets</span>
              <hr>
              <area-chart :data="areaRetweetsData" xtitle="polarity" ytitle="retweets"></area-chart>
              <span class="tag is-success">Polarites vs likes</span>
              <hr>
              <area-chart :data="areaLikesData" xtitle="polarity" ytitle="likes"></area-chart>
            </b-tab-item>
          </b-tabs>
        </template>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',

  data() {
    return {
      search: {},
      isEmpty: false,
    };
  },

  computed: {
    loading() {
      return this.$store.getters.getStatus;
    },

    tweets() {
      return this.$store.getters.getTweets;
    },

    polarites() {
      const rawData = this.$store.getters.getTweets;
      const data = [];
      rawData.forEach((item) => {
        data.push(item.polarity);
      });
      return data;
    },

    retweets() {
      const rawData = this.$store.getters.getTweets;
      const data = [];
      rawData.forEach((item) => {
        data.push(item.retweets);
      });
      return data;
    },

    likes() {
      const rawData = this.$store.getters.getTweets;
      const data = [];
      rawData.forEach((item) => {
        data.push(item.likes);
      });
      return data;
    },

    locations() {
      const rawData = this.$store.getters.getTweets;
      const data = [];
      rawData.forEach((item) => {
        data.push(item.location);
      });
      return data;
    },

    positiveTweets() {
      const rawData = this.$store.getters.getTweets;
      const data = [];
      rawData.forEach((item) => {
        if (item.polarity > 0) {
          data.push(item.polarity);
        }
      });
      let {
        length,
      } = data;
      length = Math.floor(length / 200 * 100, 1);
      return length;
    },

    negativeTweets() {
      const rawData = this.$store.getters.getTweets;
      const data = [];
      rawData.forEach((item) => {
        if (item.polarity < 0) {
          data.push(item.polarity);
        }
      });
      let {
        length,
      } = data;
      length = Math.floor(length / 200 * 100, 1);
      return length;
    },

    neutralTweets() {
      const rawData = this.$store.getters.getTweets;
      const data = [];
      rawData.forEach((item) => {
        if (item.polarity === 0) {
          data.push(item.polarity);
        }
      });
      let {
        length,
      } = data;
      length = Math.floor(length / 200 * 100, 1);
      return length;
    },

    geoData() {
      const rawData = this.$store.getters.getTweets;
      const data = [];
      rawData.forEach((item) => {
        data.push([item.location, Math.floor(item.polarity)]);
      });
      return data;
    },

    areaLikesData() {
      const rawData = this.$store.getters.getTweets;
      const data = [];
      rawData.forEach((item) => {
        data.push([item.polarity, item.likes]);
      });
      return data;
    },

    areaLocationData() {
      const rawData = this.$store.getters.getTweets;
      const data = [];
      rawData.forEach((item) => {
        data.push([item.polarity, item.location]);
      });
      return data;
    },

    areaRetweetsData() {
      const rawData = this.$store.getters.getTweets;
      const data = [];
      rawData.forEach((item) => {
        data.push([item.polarity, item.retweets]);
      });
      return data;
    },
  },

  methods: {
    toggle(row) {
      this.$refs.table.toggleDetails(row);
    },

    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.dispatch('fetchTweets', this.search)
            .then(() => {
              this.$toast.open({
                message: 'Successfully searched and found tweets',
                type: 'is-success',
                position: 'is-bottom',
              });
              this.search = {};
            })
            .catch(() => {
              this.$toast.open({
                message: 'No tweets have been found under the hashtag',
                type: 'is-danger',
                position: 'is-bottom',
              });
              this.search = {};
            });
          return;
        }
        this.$toast.open({
          message: 'Invalid form entry. Please check the field',
          type: 'is-danger',
          position: 'is-bottom',
        });
        this.search = {};
      });
    },
  },
};

</script>

<style>

</style>
