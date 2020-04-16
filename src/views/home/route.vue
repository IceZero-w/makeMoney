<script>
export default {
  data() {
    return {
      index: 1
    };
  },
  methods: {
    change1(val) {
      console.log(val);
    }
  },
  render() {
    return (
      <div class="about">
        <h1>home{this.index}</h1>
        <input type="text" v-model={this.index} oninput={this.change1}></input>
        {[1, 2, 3, 4].map(item => item)}
      </div>
    );
  }
};
</script>
