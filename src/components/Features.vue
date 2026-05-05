<script setup>
import FeaturesHeader from '@/packages/Features/Features-header.vue';
import FeaturesPage from '@/packages/Features/Features-page.vue';
import FeaturesFormat from '@/packages/Features/Features-format.vue';
import FeaturesSecurity from '@/packages/Features/Features-security.vue';
import FeaturesFooter from '@/packages/Features/Features-footer.vue';
</script>
<template>
    <section>
        <FeaturesHeader></FeaturesHeader>
        <FeaturesPage></FeaturesPage>
        <FeaturesFormat></FeaturesFormat>
        <FeaturesSecurity></FeaturesSecurity>
        <FeaturesFooter></FeaturesFooter>
    </section>
</template>
<style scoped>
section{
padding-top: 85px;
}
</style>