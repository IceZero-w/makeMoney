<script>
import { demoApi } from "@/apis/user.js";

export default {
  data() {
    return {};
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const { status } = await demoApi();
      if (status) {
        console.log(22);
      }
    }
  },
  render() {
    return <div>MMM</div>;
  }
};
</script>
