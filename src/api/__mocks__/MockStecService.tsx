    fetchDiff(sha: SHA): Promise<string> {
        return Promise.resolve(`diff --git a/README.adoc b/README.adoc \n new file mode 100644 \n index 0000000..9c2d38b \n \ 
        --- /dev/null \n +++ b/README.adoc \n @@ -0,0 +1,3 @@ \n +## Intro \n  + \n +Welcome!`);
    }
