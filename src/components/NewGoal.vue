<template>
    <div class="wrapper">
    <div class="goal main-blue">
        <h4>Goal name</h4>
        <div class="checkboxes">
        <input type="checkbox" name="checkbox" value="day" id="day">
        <input type="checkbox" name="checkbox" value="day" id="day">
        <input type="checkbox" name="checkbox" value="day" id="day">
        <input type="checkbox" name="checkbox" value="day" id="day">
        <input type="checkbox" name="checkbox" value="day" id="day">
        <input type="checkbox" name="checkbox" value="day" id="day">
        <input type="checkbox" name="checkbox" value="day" id="day">
        </div>
    </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
.wrapper{
    display: flex;
    justify-content: center;
    margin: 0 .8em;
}
.goal{
    // background-color: ;
    height: 7.6em;
    width: 80%;
    margin: 1.5em 1.5em;
    border-radius: .5em;
}
input[type=checkbox]{
    margin: 0.3em 1em;
    transform: scale(2.5);
    border: 1px black solid;
}
    

</style>