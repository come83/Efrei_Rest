package rest.model;

public class Movie {
    private int id;
    private String title;
    private int duration;
    private String language;
    private String director;
    private String mainActor;
    private int min_age;

    public Movie() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getMainActor() {
        return mainActor;
    }

    public void setMainActor(String mainActor) {
        this.mainActor = mainActor;
    }
    
    public int getMin_age() {
    	return min_age;
    }
    
    public void setMin_age(int min_age) {
    	this.min_age = min_age;
    }
}


